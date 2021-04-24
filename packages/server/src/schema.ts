const typeDefs = `
  scalar Date

  enum TransactionType {
    EXPENSE
    INCOME
  }

  type Category {
    id: Int!
    name: String
    transactionType: TransactionType!
    createdAt: Date!
    updatedAt: Date!

    transactions: [Transaction!]
  }

  type Transaction {
    id: Int!
    amount: Float!
    date: Date!
    description: String!
    transactionType: TransactionType!
    createdAt: Date!
    updatedAt: Date!

    category: Category!
  }

  type Query {
    categories: [Category!]!
    transactions(year: Int): [Transaction!]!
    years: [Int]!
  }
`;

export default typeDefs;
