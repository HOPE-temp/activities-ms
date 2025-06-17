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
import { UpdateActivityDto } from '../dto/update-activity.dto';
import { FilterActivityDto } from '../dto/filter-activity.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleUser } from 'src/auth/models/roles.model';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { PayloadToken } from 'src/auth/models/token.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Roles(RoleUser.ADMIN, RoleUser.VOLUNTEER)
  @Post()
  @ApiOperation({ summary: 'Register an activity' })
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @Roles(RoleUser.ADMIN, RoleUser.VOLUNTEER)
  @Get()
  @ApiOperation({ summary: 'Get list of activities' })
  findAll(@Query() params: FilterActivityDto) {
    return this.activitiesService.findAll(params);
  }

  @Roles(RoleUser.ADMIN, RoleUser.VOLUNTEER)
  @Get(':id')
  @ApiOperation({ summary: 'Get acivity by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activitiesService.findOne(id);
  }

  @Roles(RoleUser.ADMIN, RoleUser.VOLUNTEER)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an activity' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Roles(RoleUser.ADMIN, RoleUser.VOLUNTEER)
  @Patch(':id/finish')
  @ApiOperation({ summary: 'Finish activity' })
  finishActivity(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request
  ) {
      const { sub, role } = req.user as PayloadToken;

    return this.activitiesService.endActivity(id, sub, role);
  }

  @Roles(RoleUser.ADMIN, RoleUser.VOLUNTEER)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete activity' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.activitiesService.remove(id);
  }
}
