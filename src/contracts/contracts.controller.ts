import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, Subscription } from 'rxjs';
import { ContractsService } from './contracts.service';
import { Contract } from './entities/contract.entity';

@Controller()
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  @Get('chains/:chainId/contracts/:contractId')
  async findOne(
    @Param('chainId', ParseIntPipe) chainId,
    @Param('contractId') contractId,
  ): Promise<Contract> {
    try {
      const data = await this.contractsService.findOne(chainId, contractId);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
