import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractsService {
  constructor(private httpService: HttpService) {}

  private readonly contractMock: Contract = {
    address: '0x95ba94c6a2Dc8521754e7B8f4C1dFDBC9A271cA5',
    name: 'GnosisSafeProxy',
    displayName: '',
    logoUri: null,
    contractAbi: {
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_singleton',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          stateMutability: 'payable',
          type: 'fallback',
        },
      ],
      description: 'GnosisSafeProxy',
      relevance: 100,
    },
    trustedForDelegateCall: false,
  };

  async findOne(chainId: number, contractId: string): Promise<Contract> {
    console.log(`Getting contract for chain ${chainId} and id ${contractId}`);

    try {
      return this.httpService
        .get(`https://safe-transaction.gnosis.io/api/v1/contracts/${contractId}/`)
        .pipe(map((res) => res.data))
        .toPromise();
    } catch (err) {
      console.error(err);
    }
  }
}
