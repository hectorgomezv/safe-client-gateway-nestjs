import { Injectable } from '@nestjs/common';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractsService {
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

  findOne(chainId: number, contractId: number): Contract {
    console.log(`Getting contract for chain ${chainId} and id ${contractId}`);
    return this.contractMock;
  }
}
