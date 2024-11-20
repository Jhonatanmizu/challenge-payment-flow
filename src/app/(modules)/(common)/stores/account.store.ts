import { create } from "zustand";
import { IAccount, ICard } from "@/src/app/(modules)/(common)/types";

const mockedAccount: IAccount = {
  accountId: "123456789",
  balance: 2000.0,
  currency: "BRL",
  status: "active",
  owner: { name: "John Doe", id: "987654321" },
  cards: [
    {
      cardId: "1",
      name: "Platinum",
      securityCode: "***",
      cardNumber: "****181",
      holder: "John Doer",
      expirationDate: "12/2025",
      brand: "Visa",
      favorite: true,
      used: true,
      brandImage: require("../../../../assets/visa_brand.png"),
    },
    {
      cardId: "2",
      name: "Platinum",
      securityCode: "***",
      cardNumber: "****181",
      holder: "John Doer",
      expirationDate: "12/2025",
      brand: "NuCard",
      favorite: true,
      used: true,
      brandImage: require("../../../../assets/master_card_brand.png"),
    },
    {
      cardId: "3",
      name: "Platinum",
      securityCode: "***",
      cardNumber: "****181",
      holder: "John Doer",
      expirationDate: "12/2025",
      brand: "Itau",
      favorite: true,
      used: true,
      brandImage: require("../../../../assets/master_card_brand.png"),
    },
  ],
};

interface AccountStoreState {
  account: IAccount;
  isLoadingAccount: boolean;
  isLoadingCards: boolean;
}

interface AccountStoreAction {
  getAccount: () => Promise<IAccount>;
  getCards: () => Promise<ICard[]>;
}

const initialState: AccountStoreState = {
  account: mockedAccount,
  isLoadingAccount: false,
  isLoadingCards: false,
};

export const useAccountStore = create<AccountStoreState & AccountStoreAction>(
  (set, get) => ({
    ...initialState,
    getCards: async () => {
      set({ isLoadingCards: true });
      try {
        const result = await new Promise<ICard[]>((resolve) =>
          setTimeout(() => resolve(get().account.cards), 5000)
        );
        return result;
      } catch (error) {
        console.error("Error when trying to get cards", error);
        throw error;
      } finally {
        set({ isLoadingCards: false });
      }
    },
    getAccount: async () => {
      set({ isLoadingAccount: true });
      try {
        const result = await new Promise<IAccount>((resolve) =>
          setTimeout(() => resolve(get().account), 5000)
        );
        return result;
      } catch (error) {
        console.error("Error when trying to get account", error);
        throw error;
      } finally {
        set({ isLoadingAccount: false });
      }
    },
  })
);
