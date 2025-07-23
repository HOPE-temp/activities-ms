import 'reflect-metadata';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'finished_by',
    nullable: true,
  })
  finisher: number;

  @Column({
    type: 'uuid',
    name: 'adopted_followup',
    nullable: true,
  })
  adoptedAnimal: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  title: string;

  @Column({
    name: 'image_url',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  imageUrl: string;

  @Column({
    name: 'resource_url',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  resourceUrl: string;

  @Column({
    name: 'schedule_start_at',
    type: 'datetime',
    nullable: true,
  })
  scheduleStartAt: Date;

  @Column({
    name: 'schedule_end_at',
    type: 'datetime',
    nullable: true,
  })
  scheduleEndAt: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  finished: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  admin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
