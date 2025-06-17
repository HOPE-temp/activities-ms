import 'reflect-metadata';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
  MinDate,
  ValidateIf,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { IsAfter } from 'src/common/validators/is-after.validator';

export class CreateActivityDto {
  @IsString()
  @MaxLength(150)
  title: string;

  @IsOptional()
  @MaxLength(200)
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @MaxLength(200)
  @IsUrl()
  resourceUrl?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date(), {
    message: ({ constraints }) => {
      if (constraints[0] instanceof Date) {
        const formateador = new Intl.DateTimeFormat('sv-SE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZoneName: 'short',
        });
        return `${formateador.format(constraints[0])} La fecha debe ser mayor al momento actual (incluyendo la hora)`;
      }
      return `${constraints[0]}La fecha debe ser mayor al momento actual (incluyendo la hora)`;
    },
  })
  scheduleStartAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ValidateIf((item) => !!item.scheduleStartAt, {
    message: 'It should exist scheduleStartAt',
  })
  @IsAfter('scheduleStartAt')
  scheduleEndAt?: Date;

  @IsOptional()
  @IsBoolean()
  admin?: boolean;
}
