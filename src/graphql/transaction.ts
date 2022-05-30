export const getTransactionsQuery = /* GraphQL*/ `query GetTransactions($fromDate: DateTime, $toDate: DateTime, $fromAmount: Int, $toAmount: Int, $reasons: [String!], $take: Int, $skip: Int) {
  getTransactions(fromDate: $fromDate, toDate: $toDate, fromAmount: $fromAmount, toAmount: $toAmount, reasons: $reasons, take: $take, skip: $skip) {
    transactions {
      id
      amount
      date
      note
      updatedAt
      reasons {
        id
        text
        updatedAt
      }
    }
    total
    take
    skip
  }
}`;

export const getTransactionQuery = /* GraphQL*/ `
query GetTransaction($getTransactionId: Int!) {
  transaction: getTransaction(id: $getTransactionId) {
    id
    amount
    date
    note
    updatedAt
    reasons {
      id
      text
      updatedAt
    }
  }
}
`;

export const createTransactionMutation = /* GraphQL*/ `
  mutation CreateTransactionMutation($date: DateTime!, $amount: Int!, $reasons: [NonEmptyString]!, $note: String) {
    transaction: createTransaction(date: $date, amount: $amount, reasons: $reasons, note: $note) {
      id
      amount
      date
      note
      updatedAt
      reasons {
        id
        text
        updatedAt
      }
    }
  }
`;

export const updateTransactionMutation = /* GraphQL*/ `
  mutation UpdateTransactionMutation($updateTransactionId: Int!, $date: DateTime, $amount: Int, $reasons: [NonEmptyString!], $note: String) {
    updateTransaction(id: $updateTransactionId, date: $date, amount: $amount, reasons: $reasons, note: $note) {
      id
      amount
      date
      note
      updatedAt
      reasons {
        id
        text
        updatedAt
      }
    }
  }
`;

export const deleteTransactionMutation = /* GraphQL*/ `
  mutation DeleteTransactionMutation($deleteTransactionId: Int!) {
    deleteTransaction(id: $deleteTransactionId)
  }
`;
