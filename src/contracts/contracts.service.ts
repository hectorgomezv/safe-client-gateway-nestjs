import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { map, lastValueFrom } from 'rxjs';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractsService {
  constructor(private httpService: HttpService) {}

  async findOne(chainId: number, address: string): Promise<Contract> {
    try {
      return await lastValueFrom(this.httpService.get(`/contracts/${address}/`).pipe(map((res) => res.data)));
    } catch (err) {
      throw new HttpException(err.response.statusText, err.response.status);
    }
  }
}
