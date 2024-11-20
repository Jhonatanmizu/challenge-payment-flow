import { IFees } from "./fees";

export interface ISimulation {
  amountToPay: number;
  installmentAmount: number;
  installments: number;
  fees: IFees;
}
