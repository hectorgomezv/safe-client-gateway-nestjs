import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { Contract } from './entities/contract.entity';

@Controller()
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  @Get('chains/:chainId/contracts/:address')
  findOne(@Param('chainId', ParseIntPipe) chainId, @Param('address') address): Promise<Contract> {
    return this.contractsService.findOne(chainId, address);
  }
}
