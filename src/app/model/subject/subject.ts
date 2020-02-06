import { domain } from "../domain/domain";

// tslint:disable-next-line:class-name
export interface subject {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    domains: domain[];
    status:number;
}
