import { buildSchema, GraphQLSchema } from 'graphql';


const Schema: GraphQLSchema = buildSchema(`

    type AuthenticationData {
        _id: ID!
        token: String!
        expireIn: Int!
    }

    type User {
        _id: ID!
        firstname: String!
        lastname: String!
        email: String!
        password: String
        role: Int
        money: Int
    }

    input inputUser {
        firstname: String!
        lastname: String!
        email: String!
        password: String!
    }

    input inputMoneyLender {
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        money: Int!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthenticationData!
        getUsers: [User!]!
    }

    type RootMutation {
        createUser(InputUser: inputUser): User!
        createMoneyLender(InputMoneyLender: inputMoneyLender): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

export default Schema;