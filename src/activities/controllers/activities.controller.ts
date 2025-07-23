import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ActivitiesService } from '../services/activities.service';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { FilterActivityDto } from '../dto/filter-activity.dto';
import { ApiOperation } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtRpcAuthGuard } from '../guards/JwtRpcAuthGuard.guard';
import { RpcUser } from '../decorator/RpcUser.decotarator';
import { RoleUser } from 'src/auth/models/roles.model';
import {
  UpdateActivityDto,
  UpdateFinishActivityDto,
} from '../dto/update-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @MessagePattern({ cmd: 'register_activity' })
  registerActivity(@Payload() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @MessagePattern({ cmd: 'all_activities' })
  @ApiOperation({ summary: 'Get list of activities' })
  findAllActivities(@Payload() params: FilterActivityDto) {
    return this.activitiesService.findAll(params);
  }

  @MessagePattern({ cmd: 'one_activity' })
  @ApiOperation({ summary: 'Get acivity by id' })
  findOneActivity(@Payload('id', ParseIntPipe) id: number) {
    return this.activitiesService.findOne(id);
  }

  @MessagePattern({ cmd: 'finish_activity' })
  finishActivity(@Payload() updateActivityDto: UpdateFinishActivityDto) {
    return this.activitiesService.endActivity(
      updateActivityDto.id,
      updateActivityDto.sub,
      updateActivityDto.role,
    );
  }
}
