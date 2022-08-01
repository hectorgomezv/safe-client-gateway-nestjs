import { Test, TestingModule } from '@nestjs/testing';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';

describe('ContractsController', () => {
  let controller: ContractsController;
  let service: ContractsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractsController],
    })
      .useMocker((token) => {
        if (token === ContractsService) {
          return {
            findOne: jest.fn().mockResolvedValue({}),
          };
        }
      })
      .compile();

    controller = module.get<ContractsController>(ContractsController);
    service = module.get<ContractsService>(ContractsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the value provided by ContractsService', () => {
    service.findOne = jest.fn().mockImplementation(() => 3);
    expect(controller.findOne(expect.anything(), expect.anything())).toBe(3);
  });
});
