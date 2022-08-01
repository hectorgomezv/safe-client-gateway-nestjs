import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';

@Module({
  imports: [
    CacheModule.register(),
    HttpModule.register({
      timeout: 10_000,
      baseURL: 'https://safe-transaction.gnosis.io/api/v1',
    }),
  ],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
