export class Company {

    constructor(
        public name: string,
        public startDemoDay?: Date,
        public demoDay?: number,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
        public idTenant?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public id?: string,
    ){}
}