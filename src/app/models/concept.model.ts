export class Concept {

    constructor(
       
        public code: string,
        public description: string,
        public idCompany: string,
        public account: string,
        public counterPart: string,
        public idConceptType: string,
        public idConceptGroup: string,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public id?: string,
    ){}
}