import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Exam } from 'src/app/model/exam/exam';
import { forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ExamUser } from 'src/app/model/ExamUser';
import { Constant } from 'src/app/common/constant';

@Component({
  selector: 'app-exam-detail-admin',
  templateUrl: './exam-detail-admin.component.html',
  styleUrls: ['./exam-detail-admin.component.scss']
})
export class ExamDetailAdminComponent implements OnInit {
  examUsers: ExamUser[] = [];
  examUsers1: ExamUser[] = [];
  examId: number;
  userId: number;
  perPage = 5;
  showTable: Boolean = true;
  exam:Exam;
  numberComplted1:any;
  numberComplted0:any;
  url:string;
  constructor(
    private activeRoute: ActivatedRoute,
    private examService: ExamService,
  ) { }


  ngOnInit() {
    this.examId = this.activeRoute.snapshot.params['idExam'];
    this.userId = this.activeRoute.snapshot.params['idUser'];
    this.url=Constant.API_EXPORT_FILE + '/' + this.examId;
    this.getListExamResultByUserIdAndExamId();
    this.getExamById();
    this.getCountExamUserFinish();
    this.getCountExamUserUnfinish();
    this.getListExamResultByCompletedAndExamId();
  }
  getListExamResultByUserIdAndExamId() {
    this.examService.getListExamUserByExamID(0, this.examId).subscribe((data: ExamUser[]) => {
      this.examUsers = data;
     
    })
  }
  getListExamResultByCompletedAndExamId() {
    this.examService.getListExamUserCompletedExamID(this.examId).subscribe((data: ExamUser[]) => {
      this.examUsers1 = data;
    })
  }
  getExamById(){
    this.examService.getExamsById(this.examId).subscribe((data:Exam)=>{
      this.exam=data;
    })
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
  getCountExamUserFinish(){
    this.examService.getCountExamUserFinish(this.examId).subscribe((data:Number)=>{
      this.numberComplted1=data
    })
  }
  getCountExamUserUnfinish(){
    this.examService.getCountExamUserUnfinish(this.examId).subscribe((data:Number)=>{
      this.numberComplted0=data;
    })
  }
  export(){
    this.examService.export(this.examId).subscribe((res) => {
      var file = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });            
      var fileURL = URL.createObjectURL(file);
      
      window.open(fileURL);

    })
  }}
