import { subject } from "../subject/subject";
import { Exam } from "../exam/exam";
export class Product {
    productId: number;
    thumbnail: string;
    tagLine: string;
    briefInfo: string;
    contentType: string;
    documentLink: string;
    subjects: subject;
    exams: Exam;
    fullInfo: string;
    name: string;
    startDate: Date;
    endDate: Date;
    exam_id: number;
    subject_id: number;
    isHot: boolean;
}

