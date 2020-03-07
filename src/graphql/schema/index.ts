import { buildSchema, GraphQLSchema } from 'graphql';

const Schema: GraphQLSchema = buildSchema(`

    type AuthenticationData {
        _id: ID!
        token: String!
        expireIn: Int!
    }

    type Loan {
        _id: ID!
        user: ID!
        money: Int!
        moneylender: ID!
    }

    type User {
        _id: ID!
        firstname: String!
        lastname: String!
        email: String!
        password: String
        role: String!
        money: Int
    }

    input inputUser {
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        money: Int
    }

    input inputLoan {
        user: ID!
        money: Int!
        moneylender: ID!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthenticationData!
        getUsers: [User!]!
        getUser(email: String!): User
        getLoans(user: ID, moneylender: ID): [Loan!]!
    }

    type RootMutation {
        createUser(InputUser: inputUser): User!
        createMoneyLender(InputMoneyLender: inputUser): User!
        createLoan(InputLoan: inputLoan): Loan!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

export default Schema;