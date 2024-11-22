import { IFees, ISimulation } from "../types";

export function calculateFixedFee(
  amountToPay: number,
  fees: IFees["fixed"]
): number {
  return fees.amount + amountToPay * fees.percentage;
}

export function calculateInstallmentFee(
  installmentAmount: number,
  installments: number,
  fees: IFees["installments"]
): number {
  return installments * (fees.amount + installmentAmount * fees.percentage);
}

export function calculateFinalAmount(simulation: ISimulation): number {
  const fixedFee = calculateFixedFee(
    simulation.amountToPay,
    simulation.fees.fixed
  );
  const installmentFee = calculateInstallmentFee(
    simulation.installmentAmount,
    simulation.installments,
    simulation.fees.installments
  );
  return simulation.amountToPay + fixedFee + installmentFee;
}
