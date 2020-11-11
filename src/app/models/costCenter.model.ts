export class CostCenter {

    constructor(
       
        public code: string,
        public description: string,
        public idSpendingAccount: string,
        public idCompany: string,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public id?: string,
    ){}
}