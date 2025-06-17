import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from '../services/activities.service';
import { CreateActivityDto } from '../dto/create-activity.dto';

describe('ActivitiesController', () => {
  let controller: ActivitiesController;
  let service: ActivitiesService;

  const mockService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesController],
      providers: [
        {
          provide: ActivitiesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ActivitiesController>(ActivitiesController);
    service = module.get<ActivitiesService>(ActivitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create a pet', async () => {
    const dto: CreateActivityDto = {
      title: 'Nueva actividad',
      scheduleStartAt: new Date(),
      scheduleEndAt: new Date(),
    };
    const result = {
      id: 1,
      admin: false,
      title: 'Nueva actividad',
      imageUrl: null,
      resourceUrl: null,
      scheduleStartAt: new Date(),
      scheduleEndAt: new Date(),
    };

    mockService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
  });

  it('should return all pets', async () => {
    const result = [{ id: 1, name: 'Firulais' }];
    mockService.findAll.mockResolvedValue(result);
    const list = await controller.findAll({});

    expect(list).toEqual(result);
  });

  it('should return all pets', async () => {
    const item = { id: 1, name: 'Firulais' };
    const result = Array.from({ length: 50 }, () => ({ ...item }));

    mockService.findAll.mockResolvedValue(result);
    const list = await controller.findAll({});

    expect(list.length).toEqual(50);
  });
});
