export const getTransactionsQuery = /* GraphQL*/ `query GetTransactions(
  $fromDate: Date
  $toDate: Date
  $fromAmount: Int
  $toAmount: Int
  $reasonIds: [Int!]
  $lastCursor: Int
  $take: Int
) {
  transactions: getTransactions(
    fromDate: $fromDate
    toDate: $toDate
    fromAmount: $fromAmount
    toAmount: $toAmount
    reasonIds: $reasonIds
    lastCursor: $lastCursor
    take: $take
  ) {
    id
    amount
    date
    note
    updatedAt
    reason {
      id
      text
      updatedAt
    }
  }
}`;

export const getTransactionQuery = /* GraphQL*/ `query GetTransaction($id: Int!) {
  transaction: getTransaction(id: $id) {
    id
    amount
    date
    note
    updatedAt
    reason {
      id
      text
      updatedAt
    }
  }
}`;

export const createTransactionMutation = /* GraphQL*/ `mutation CreateTransaction($date: Date!, $amount: Float!, $reasonId: Int!, $note: String) {
  transaction: createTransaction(date: $date, amount: $amount, reasonId: $reasonId, note: $note) {
    id
    amount
    date
    note
    updatedAt
    reason {
      id
      text
      updatedAt
    }
  }
}`;

export const updateTransactionMutation = /* GraphQL*/ `mutation UpdateTransaction($id: Int!, $date: Date, $amount: Float, $reasonId: Int, $note: String) {
  transaction: updateTransaction(id: $id, date: $date, amount: $amount, reasonId: $reasonId, note: $note) {
    id
    amount
    date
    note
    updatedAt
    reason {
      id
      text
      updatedAt
    }
  }
}`;

export const createReasonMutation = /* GraphQL*/ `mutation CreateReason($text: String!) {
  reason: createReason(text: $text) {
    id
    text
    updatedAt
  }
}`;

export const deleteTransactionMutation = /* GraphQL*/ `mutation DeleteTransaction($id: Int!) {
  deleteTransaction(id: $id)
}`;
