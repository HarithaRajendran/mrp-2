import { Dependent } from "./dependent";

export interface User {
    id?: string | null;
    name?: string;
    address?: Address;
    dateOfBirth?: string;
    contactDetail?: string;
    panCardNumber?: string;
    email?: string;
    password?: string;
}

export interface Address {
    addressLine?: string;
    country?: string;
    state?: string;
    city?: string;
    pinCode?: number;
}