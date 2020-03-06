import express, { Express } from 'express';
import { buildSchema, GraphQLSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';
import './lib/env';
import './models/db';

const app: Express = express();
const PORT: string | undefined = process.env.PORT;

const Schema: GraphQLSchema = buildSchema(`

    type RootQuery {
        login(email: String, password: String): String
    }

    schema {
        query: RootQuery
    }
`);

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: {

    },
    graphiql: true,
}))

app.listen( PORT, () => 
    console.log(`Listening on PORT ${PORT}`))


