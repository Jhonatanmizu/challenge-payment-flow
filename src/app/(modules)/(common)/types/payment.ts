import { IReceiver } from "./receiver";

export interface IPayment {
  transactionId: string;
  amount: number;
  currency: string;
  receiver: IReceiver;
  method: "credit_card" | "debit_card" | "bank_transfer" | "cash";
  simulation: ISimulation[];
}
