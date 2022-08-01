import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { of } from 'rxjs';
import { ContractsService } from './contracts.service';

describe('ContractsService', () => {
  let service: ContractsService;
  let cache: Cache;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractsService],
    })
      .useMocker((token) => {
        if (token === CACHE_MANAGER) {
          return {
            get: () => 'a value',
            set: () => jest.fn(),
          };
        }
        if (token === HttpService) {
          return {
            get: () => jest.fn().mockReturnValue(of({ data: { foo: 'bar' } })),
          };
        }
      })
      .compile();

    service = module.get<ContractsService>(ContractsService);
    cache = module.get<Cache>(CACHE_MANAGER);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the cached value if any', async () => {
    const testData = { data: 'testContract' };
    cache.get = jest.fn().mockResolvedValueOnce(testData);
    await expect(service.findOne(expect.anything(), expect.anything())).resolves.toBe(testData);
  });

  it('should make an http call if no cached value is present', async () => {
    cache.get = jest.fn().mockResolvedValueOnce(null);
    httpService.get = jest.fn().mockReturnValueOnce(of({ data: { foo: 'bar' } }));
    await expect(service.findOne(expect.anything(), expect.anything())).resolves;
    await expect(httpService.get(expect.anything())).resolves.toBeCalledTimes(2);
  });
});
