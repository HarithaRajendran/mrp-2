export interface Claim {
    id?: number;
    name?: string;
    dateOfBirth?: string;
    dateOfAdmission?: string;
    dateOfDischarge?: string;
    totalBillAmount?: number;
    memberId?: string;
    userId?: string;
}

export interface MemberDetail{
    memberId?: string;
    name?: string;
	dateOfBirth?: string;
}