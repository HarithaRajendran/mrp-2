import { Dependent } from "./dependent";
import { User } from "./user";

export interface UserDetail {
    user?: User;
    dependents?: Dependent[];
}