import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { Contract } from './entities/contract.entity';

@Controller()
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  @Get('chains/:chainId/contracts/:contractId')
  findOne(
    @Param('chainId', ParseIntPipe) chainId,
    @Param('contractId', ParseIntPipe) contractId,
  ): Contract {
    return this.contractsService.findOne(chainId, contractId);
  }
}
