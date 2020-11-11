export class Position {

    constructor(
        public description: string,
        public idCompany: string,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public id?: string,
    ){}
}