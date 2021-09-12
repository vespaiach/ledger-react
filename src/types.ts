export interface TransactionModel {
  id?: number;
  amount?: number;
  date?: Date;
  description?: string;
  updatedAt?: Date;
  reason?: ReasonModel;
}

export interface ReasonModel {
  id?: number;
  text?: string;
  updatedAt?: Date;
}
