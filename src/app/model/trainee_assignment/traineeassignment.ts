export interface TraineeAssignment{
  id: number;
  fullName: string;
  timeSubmit: Date;
  trainerId: number;
  result: number;
  resultDetail: string;
  timeEval: Date;
  assignment: string;
  evaluator: string;
}
