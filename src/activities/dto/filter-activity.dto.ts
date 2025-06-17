import 'reflect-metadata';
import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class FilterActivityDto extends PaginationDto {
  @IsBoolean()
  @IsOptional()
  finished?: boolean;
}
