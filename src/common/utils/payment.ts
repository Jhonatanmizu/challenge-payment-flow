import { IFees } from "../types";

interface PaymentDetails {
  baseAmount: number;
  installments: number;
  fees: IFees;
}
interface PaymentResult {
  amountToPay: number;
  installmentAmount: number;
  installments: number;
  fees: IFees;
}

export function calculatePayment(details: PaymentDetails): PaymentResult {
  const { baseAmount, installments, fees } = details;

  const fixedFeeAmount = fees.fixed.amount;

  const installmentFeePercentage =
    installments > 1 ? fees.installments.percentage : 0;
  const installmentFeeAmount =
    installments > 1 ? baseAmount * installmentFeePercentage : 0;

  const totalFees = fixedFeeAmount + installmentFeeAmount;

  const amountToPay = baseAmount + totalFees;

  const installmentAmount = amountToPay / installments;

  return {
    amountToPay,
    installmentAmount,
    installments,
    fees,
  };
}
