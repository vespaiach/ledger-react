export const getTransactionsQuery = /* GraphQL*/ `query GetTransactions($fromDate: DateTime, $toDate: DateTime, $fromAmount: BigInt, $toAmount: BigInt, $reasons: [String!], $take: Int, $skip: Int) {
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
query GetTransaction($id: Int!) {
  transaction: getTransaction(id: $id) {
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
  mutation CreateTransactionMutation($date: DateTime!, $amount: BigInt!, $reasons: [NonEmptyString!]!, $note: String) {
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
  mutation UpdateTransactionMutation($id: Int!, $date: DateTime, $amount: BigInt, $reasons: [NonEmptyString!], $note: String) {
    transaction: updateTransaction(id: $id, date: $date, amount: $amount, reasons: $reasons, note: $note) {
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
  mutation DeleteTransactionMutation($id: Int!) {
    deleteTransaction(id: $id)
  }
`;
