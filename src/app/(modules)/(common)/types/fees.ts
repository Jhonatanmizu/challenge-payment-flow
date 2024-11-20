export interface IFees {
  fixed: IFee;
  installments: IFee;
}
export interface IFee {
  amount: number;
  percentage: number;
}
