export interface AbiItem {
  inputs: any[];
  stateMutability: string;
  type: string;
}

export interface ContractAbi {
  abi: Partial<AbiItem>[];
  description: string;
  relevance: number;
}

export interface Contract {
  address: string;
  name: string;
  displayName: string;
  logoUri: string;
  contractAbi: ContractAbi;
  trustedForDelegateCall: boolean;
}
