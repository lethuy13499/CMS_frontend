// tslint:disable-next-line:class-name
import { subject } from "../subject/subject";
import { Exam } from "../exam/exam";

export interface chapter {
    id: number;
    name: string;
    parent_name: number;
    created_at: Date;
    updated_at: Date;
    subject_name: string;
    subjects: subject;
    exams: Exam;
    exam_name: string;
    contentType: string;
    // chapterOrder: string;
    assignment: string;
    chapterOrder: number;
    parent_id: number;
    status:number;


}
