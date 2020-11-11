export class WorkPlaceRisks {

    constructor(
        public id: string,
        public code: string,
        public description: string,
        public percentaje: number,
        public createUser?: string,
        public updateUser?: string,
        public isActive?: boolean,
    ){}
}