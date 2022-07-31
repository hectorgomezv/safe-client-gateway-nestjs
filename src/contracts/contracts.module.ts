import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';

@Module({
  imports: [HttpModule],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
