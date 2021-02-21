export class Concept {

    constructor(
       
        public code: string,
        public description: string,
        public companyId: string,
        public account: string,
        public counterPart: string,
        public conceptTypeId: string,
        public conceptCategoryId: string,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public id?: string,
    ){}
}