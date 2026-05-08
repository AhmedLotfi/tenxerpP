import { Solution } from './solution.model';

export interface CartItem {
  solution: Solution;
  seats: number;
}

export interface CheckoutPayload {
  items: { solutionId: number; seats: number }[];
  contactName: string;
  contactEmail: string;
  contactCompany: string;
  notes?: string;
}
