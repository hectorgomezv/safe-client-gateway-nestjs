import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, HttpException, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { map, lastValueFrom } from 'rxjs';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private httpService: HttpService,
  ) {}

  private buildCacheKey(chainId: number, address: string): string {
    return `${chainId}_${address}`;
  }

  async findOne(chainId: number, address: string): Promise<Contract> {
    try {
      const cacheKey: string = this.buildCacheKey(chainId, address);
      const cached: Contract = await this.cacheManager.get(cacheKey);

      if (cached) {
        return cached;
      }

      const data = await lastValueFrom(
        this.httpService.get(`/contracts/${address}/`).pipe(map((res) => res.data)),
      );

      await this.cacheManager.set(cacheKey, data, { ttl: 0 });

      return data;
    } catch (err) {
      throw new HttpException(err.response.statusText, err.response.status);
    }
  }
}
