import { Action as ReduxAction } from 'redux';

/**
 * Redux action
 */
export type Action<T = string, P = any> = ReduxAction<T> & { payload?: P };

export enum TransactionType {
    Income = 'in',
    Expense = 'ex',
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
    code: AppMessageCode;
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

export type AppRootState = {
    wholeApp: WholeAppState;
    transaction: TransactionState;
    transactionFilter: TransactionFilterState;
};

export enum AppBusyCode {
    Idle,
    Loading,
    Saving,
}

/**
 * Server + client message and error codes.
 */
export enum AppMessageCode {
    // Server exception
    QueryTransactionFailure = 'E_QUERY_TRANSACTION',
    UpdateTransactionFailure = 'E_UPDATE_TRANSACTION',
    DeleteTransactionFailure = 'E_DELETE_TRANSACTION',
    CreateTransactionFailure = 'E_CREATE_TRANSACTION',

    ValidationFailure = 'E_VALIDATION_FAILURE',
    InternalServerFailure = 'E_INTERNAL_SERVER',
    WrongCredentialFailure = 'E_WRONG_CREDENTIALS',
    AuthorizedFailure = 'E_UNAUTHORIZED',

    // Client exception
    NetworkError = 'E_NETWORK',
    UnknownError = 'E_UNKNOWN',

    // Success
    CreateTrasactionSuccess = 'S_CREATE_TRANSACTION',
    UpdateTransactionSuccess = 'S_UPDATE_TRANSACTION',
    DeleteTransactionSuccess = 'S_DELETE_TRANSACTION',
    SignoutSuccess = 'S_SIGNOUT',
}

export interface WholeAppState {
    /**
     * We don't want to show detail error, just a general message.
     */
    messageCode: AppMessageCode | null;
    busyCode: AppBusyCode;
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
