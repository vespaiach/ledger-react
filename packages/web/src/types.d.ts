/**
 * Redux action
 */
export interface Action<T = string, P = any> {
    type: T;
    payload: P;
}

export enum TransactionType {
    Income = 'in',
    Expense = 'ex',
}

export enum AppMessageSeverity {
    Error = 'error',
    Information = 'information',
    Loading = 'loading',
    Success = 'success',
}

export interface Record {
    readonly id: number;
    [key: string]: any;
}

/**
 * Transaction record.
 *   date: date and time that transaction is recorded
 *   amount: amount of transaction
 *   description: transaction note
 *   transactionType: transaction type
 */
export interface Transaction extends Record {
    date: Date;
    amount: number;
    description: string;
    category: string;
    transactionType: TransactionType;
}

export interface HTTPResult<T> {
    ok: boolean;
    status: number;
    data: T;
}

export interface APIError {
    message: string;
    code: string;
}

/**
 * Data repository
 */
export type RemoteRepository = {
    getTransactions: (params?: {
        [key: string]: string | number;
    }) => Promise<HTTPResult<Transaction[]> | HTTPResult<APIError>>;

    updateTransaction: (params: {
        [key: string]: string | number;
    }) => Promise<HTTPResult<any> | HTTPResult<APIError>>;

    createTransaction: (params: {
        [key: string]: string | number;
    }) => Promise<HTTPResult<Transaction> | HTTPResult<APIError>>;

    deleteTransaction: (params: number) => Promise<HTTPResult | HTTPResult<APIError>>;

    getYears: (params?: {
        [key: string]: string | number;
    }) => Promise<HTTPResult<number[]> | HTTPResult<APIError>>;

    signin: (params: {
        [key: string]: string | number;
    }) => Promise<HTTPResult<{ token: string }> | HTTPResult<APIError>>;

    signout: () => Promise<HTTPResult | HTTPResult<APIError>>;
};

export interface WholeAppState {
    /**
     * We need to show a message about what application is doing.
     */
    message: string | null;
    messageSeverity: AppMessageSeverity | null;
    /**
     * When user's session timeout, we need keep the current action
     * and then re-execute it after user's login.
     */
    retainedAction: Action | null;
    showSigninDialog: boolean;
}

export type SortingFunction = (transaction1: Transaction, transaction2: Transaction) => number;

export interface TransactionState {
    list: Transaction[];
    /**
     * We use this function to sort list of transaction.
     */
    sortingFunction: SortingFunction | null;
    /**
     * We load list of transaction by year.
     */
    year: currentYear;
    /**
     * List of year that the server has transaction data.
     */
    years: number[];
    /**
     * Set this variable to true to make application fetch list of year again.
     */
    refetchListYears: boolean;
}

/**
 * We try to keep track the initial value of all filtering values, so that users
 * can restore them later.
 */
type FilterValue<T> = {
    origin: T;
    value: T;
};

export type TransactionFilterState = {
    income: FilterValue<boolean>;
    expense: FilterValue<boolean>;
    dateFrom: FilterValue<Date | null>;
    dateTo: FilterValue<Date | null>;
    amountFrom: FilterValue<number | null>;
    amountTo: FilterValue<number | null>;
    enableAmountFilter: FilterValue<boolean>;
    enableDateFilter: FilterValue<boolean>;
};
