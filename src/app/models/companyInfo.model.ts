export class CompanyInfo {
    constructor(
public name: string,
public id?: string,
public email?: string,
public createUser?: string,
public updateUser?: string,
public isActive?: boolean,
public idTenant?: string,
public idIdentificationType?: string,
public identification?: string,
public verificationNumber?: string,
public address?: string,
public phone?: string,
public legalRepresentant?: string,
public fundationDate?: Date,
public img?: string,
public createdAt?: Date,
public updatedAt?: Date,
public idCity?: string,
public idState?: string,
public idCountry?: string,
public idEntityRisks?: string,
public idCompensationFund?: string,
    ){}
}