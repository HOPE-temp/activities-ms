import { PartialType } from '@nestjs/swagger';
import { CreateActivityDto } from './create-activity.dto';
import { RoleUser } from 'src/auth/models/roles.model';
import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}

export class UpdateFinishActivityDto {
  @IsNotEmpty()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsPositive()
  sub: number;

  @IsNotEmpty()
  @IsEnum(RoleUser)
  role: RoleUser;
}
