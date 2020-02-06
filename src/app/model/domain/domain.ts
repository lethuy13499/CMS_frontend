import { subject } from "../subject/subject";

// tslint:disable-next-line:class-name
export interface domain {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    subject_name: string;
    status:number;
    subject:subject;
    
}
