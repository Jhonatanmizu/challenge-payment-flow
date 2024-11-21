import { IAccount } from "./account";
import { IPayment } from "./payment";

export interface IData {
  account: IAccount;
  payment: IPayment;
}
