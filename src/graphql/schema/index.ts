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
        password: String!
    }

    input inputUser {
        firstname: String!
        lastname: String!
        email: String!
        password: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthenticationData!
    }

    type RootMutation {
        createUser(InputUser: inputUser): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

export default Schema;