import { create } from "zustand";
import { IPayment, ISimulation } from "@/src/app/(modules)/(common)/types";

const mockedPayment: IPayment = {
  transactionId: "abc123",
  amount: 100.0,
  currency: "BRL",
  receiver: {
    name: "Maria da Silca",
    id: "45648941",
  },
  method: "credit_card",
  simulation: {
    amountToPay: 103.0,
    installmentAmount: 103.0,
    installments: 1,
    fees: {
      fixed: { amount: 3.0, percentage: 0.03 },
      installments: { amount: 0.0, percentage: 0.01 },
    },
  },
};

interface PaymentStoreState {
  payment: IPayment;
  isLoadingPayment: boolean;
  isLoadingSimulations: boolean;
}

interface PaymentStoreAction {
  getPayment: () => Promise<IPayment>;
  getSimulations: () => Promise<ISimulation>;
}

const initialState: PaymentStoreState = {
  payment: mockedPayment,
  isLoadingPayment: false,
  isLoadingSimulations: false,
};

export const usePaymentStore = create<PaymentStoreState & PaymentStoreAction>(
  (set, get) => ({
    ...initialState,
    getPayment: async () => {
      set({ isLoadingPayment: true });
      try {
        const result = await new Promise<IPayment>((resolve) =>
          setTimeout(() => resolve(get().payment), 5000)
        );
        return result;
      } catch (error) {
        console.error("Error when trying to get payment", error);
        throw error;
      } finally {
        set({ isLoadingPayment: false });
      }
    },
    getSimulations: async () => {
      set({ isLoadingSimulations: true });
      try {
        const result = await new Promise<ISimulation>((resolve) =>
          setTimeout(() => resolve(get().payment.simulation), 5000)
        );
        return result;
      } catch (error) {
        console.error("Error when trying to get simulations", error);
        throw error;
      } finally {
        set({ isLoadingSimulations: false });
      }
    },
  })
);
