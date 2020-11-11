export class SocialSecurityEntity {
    constructor(
public id: string,
public code: string,
public name: string,
public idSocialSecurityEntityType: string,
public identification?: string,
public verificationNumber?: string,
public createUser?: string,
public updateUser?: string,
public isActive?: boolean,
public idCity?: string,
public address?: string,
public phone?: string,


    ){}
}