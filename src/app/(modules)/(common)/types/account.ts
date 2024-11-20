import { ICard } from "./card";
import { IOwner } from "./owner";

export interface IAccount {
  accountId: string;
  balance: number;
  currency: string;
  status: "active" | "inactive";
  owner: IOwner;
  cards: ICard[];
}
