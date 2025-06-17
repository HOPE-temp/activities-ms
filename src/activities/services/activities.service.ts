import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { UpdateActivityDto } from '../dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../entities/activity.entity';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { FilterActivityDto } from '../dto/filter-activity.dto';
import { RoleUser } from 'src/auth/models/roles.model';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activitiesRepo: Repository<Activity>,
  ) {}

  async create(
    createActivityDto: CreateActivityDto,
    adoptedAnimal?: string,
  ) {
    const activity = this.activitiesRepo.create(createActivityDto);
    if (adoptedAnimal) {
      this.activitiesRepo.merge(activity, { adoptedAnimal });
    }
    return this.activitiesRepo.save(createActivityDto);
  }

  findAll(params?: FilterActivityDto) {
    const options: FindManyOptions<Activity> = {
      relations: [],
      take: 10,
      skip: 0,
      where: {
        finished: false,
      },
    };

    if (params) {
      const { limit, offset } = params;
      const { finished } = params;
      options.take = limit || 10;
      options.skip = offset || 0;
      const where: FindOptionsWhere<Activity> = {};
      if (finished) {
        where.finished = finished;
      }
      options.where = where;
    }

    return this.activitiesRepo.find(options);
  }

  async findOne(id: number) {
    const activity = await this.activitiesRepo.findOne({
      where: { id },
      relations: [],
    });
    if (!activity) {
      throw new NotFoundException(`Activity #${id} not found`);
    }

    return activity;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    const activity = await this.findOne(id);
    this.activitiesRepo.merge(activity, updateActivityDto);
    return this.activitiesRepo.save(activity);
  }

  async endActivity(id: number, finisher: number, rol:RoleUser) {
    const activity = await this.findOne(id);

    if (activity.admin && rol != RoleUser.ADMIN) {
      throw new UnauthorizedException('You rol admin for finish this activity');
    }

    this.activitiesRepo.merge(activity, {
      finished: true,
      finisher,
    });
    return this.activitiesRepo.save(activity);
  }

  async remove(id: number) {
    const activity = await this.findOne(id);
    return this.activitiesRepo.delete(activity);
  }
}
