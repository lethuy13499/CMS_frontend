export interface Exams{
  id: number;
	questionNum: number;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
  name: string;
  title: string;
  subject: string;
  isTested: boolean;
  status: number;
  mode: number;
  owner: string;
  duration: number;

}
