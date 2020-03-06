import express, { Express } from 'express';
import graphqlHTTP from 'express-graphql';
import { default as schema } from './graphql/schema';
import { default as rootValue } from './graphql/resolver';
import './lib/env';
import './models/db';

const app: Express = express();
const PORT: string | undefined = process.env.PORT;

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

app.listen( PORT, () => console.log(`Listening on PORT ${PORT}`));


