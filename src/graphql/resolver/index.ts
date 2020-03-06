import { default as authentication } from './authenticationResolver';
import { default as user } from './userResolver';
import { default as loan } from './loanResolver';

export default {
    ...authentication,
    ...user,
    ...loan
};