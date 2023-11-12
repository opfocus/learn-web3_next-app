

export type IsDepositModalProps = {
  bridgeAmount: number;
  depositModal: boolean;
  setDepositModal: (value: boolean) => void;
}

export type IsWithdrawModalProps = {
  bridgeAmount: number;
  withdrawModal: boolean;
  setWithdrawModal: (value: boolean) => void;
}

export type DepositOrWithdrawProps = {
  isDeposit: boolean;
  setIsDeposit?: (value: boolean) => void;
  bridgeAmount?: number;
  setBridgeAmount?: (value: number) => void;
}
