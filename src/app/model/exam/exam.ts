import { User } from '../user/users';
import { ExamUser } from '../ExamUser';
import { Subject } from 'rxjs';
import { subject } from '../subject/subject';



export interface Exam {
  id: number;
  code: string;
  created_at: Date;
  decription: string;
  time: number;
  media: string;
  name: string;
  question_num: number;
  status: number;
  title: string;
  updated_at: Date;
  end_date: Date;
  max_attempt: number;
  percent_passing: number;
  start_date: Date;
  subject: subject;
  creator: number;
  create_type: number;
  type: number;
  examMode: number;
  exam_Users:ExamUser[];
  users: User;
}
