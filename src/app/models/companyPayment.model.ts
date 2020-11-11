export class CompanyPayment {
    constructor(
public id?: string,
public createUser?: string,
public updateUser?: string,
public isActive?: boolean,
public idTenant?: string,
public accountNumber?: number,
public idPaymentFrequency?: string,
public idPaymentMethod?: string,
public idBank?: string,
public idAccountType?: string,
public createdAt?: Date,
public updatedAt?: Date,
   ){}
}