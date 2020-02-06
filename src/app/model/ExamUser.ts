export class ExamUser {
    id: number;
    fullName: string;
    mobile: string;
    email: string;
    examCode: string;
    school: string;
    start_date: Date;
    end_date: Date;
    total_score: number;
    correct_num: number;
    created_at: Date;
    update_at: Date;
    completed: number;
    pass: boolean;
}