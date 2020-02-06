import { chapter } from "../chapter/chapter";
import { Exam } from "../exam/exam";

export class Unit {
    unitId: number;
    name: string;
    contentType: string;
    exam: Exam;
    mediaLink: string;
	document: string;
    description: string;
    chapter: chapter;
}