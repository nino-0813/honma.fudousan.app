
export type ThemeMode = 'luxury' | 'pop' | 'minimalist';

export interface InvestmentData {
  propertyPrice: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  monthlyRent: number;
  managementFee: number;
  repairReserve: number;
  taxRate: number;
}

export interface SimulationResult {
  year: number;
  cashFlow: number;
  cumulativeCashFlow: number;
  loanRemaining: number;
  equity: number;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  yield: number;
  age: number;
  type: string;
  image: string;
}
