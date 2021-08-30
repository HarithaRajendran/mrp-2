import { DependentDetailI } from "./dependent-detail";

export interface MemberDetailI {
    memberId?: string;
    name: string;
    address: string;
    country: string;
    state: string;
    city: string;
    pincode: number;
    dateOfBirth: string;
    age: number;
    contactNumber: string;
    panNumber: string;
    email: string;
    password: string;
    isClaimSubmitted?: boolean;
    dependentDetails?: DependentDetailI[];
}