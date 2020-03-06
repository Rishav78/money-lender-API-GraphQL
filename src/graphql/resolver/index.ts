import { default as authentication } from './authenticationResolver';
import { default as user } from './userResolver';

export default {
    ...authentication,
    ...user
}