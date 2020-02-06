import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/service/exam/exam.service';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/service/login/user.service';
import { Constant } from 'src/app/common/constant';
import { map, tap } from 'rxjs/operators';
import { Class } from 'src/app/model/class/class';
import { ClassService } from 'src/app/service/class/class.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { Popup } from 'ng2-opd-popup';
import { RegistrantionService } from 'src/app/service/registrantion/registrantion.service';
import { subject } from 'src/app/model/subject/subject';

export interface Result {
  exam: Object;
  result: Object[];
}
export interface Resultp {
  practice: Object;
  resultp: Object[];
}

@Component({
  selector: 'app-exam-user-history',
  templateUrl: './exam-user-history.component.html',
  styleUrls: ['./exam-user-history.component.scss']
})
export class ExamUserHistoryComponent implements OnInit {
  data: any;
  listPracticeDone: Object[] = [];
  baiThiStatus = true;
  thucHanhSatus = false;
  subjects: subject[] = [];
  listExamDone: Object[] = [];
  subjectId2: number;
  constructor(
    private jwt: JwtHelperService,
    private router: Router,
    private examService: ExamService,
    public userserviceService: UserserviceService,
    private titleService: Title,
    private activeRoute: ActivatedRoute,
    public us: UserService,
    private classService: ClassService,
    private userService: UserService,
    private subjectService: SubjectService,
    private registrationService: RegistrantionService,
    private activatedRoute: ActivatedRoute
  ) { this.activeRoute.paramMap
    .pipe(
      map(params => {
        if (params.get('param1') === '') {
          this.baiThiStatus = true;
          this.thucHanhSatus = false;
        } else if (params.get('param1') === 'false' ) {
          this.xemBaiThucHanh(true);
        }
      })
    )
    .subscribe(); }

  ngOnInit() {
    this.data = this.activatedRoute.snapshot.params['id'];
    if (this.data == null){
      this.examService.getResultPractice(JSON.parse(localStorage.getItem('item')).id).subscribe( res => {
        this.listPracticeDone = res;
      });
    }  else if (this.data != null) {
      this.examService.getResultPractice(this.data).subscribe( res => {
        this.listPracticeDone = res;
      });
    }
    this.subjectService.getListSubject().subscribe(res => {
      this.subjects = res;
    });
  }
    // Xem bài thi
    xemBaiThi(para) {
      this.baiThiStatus = para;
      this.thucHanhSatus = !para;
    }
    // Xem bài thực hành
    xemBaiThucHanh(para) {
      this.thucHanhSatus = para;
      this.baiThiStatus = !para;
    }
    onChangeThi(event) {
      this.subjectId2 = event.target.value;
      this.userserviceService.getListExamByUserAndSubject(JSON.parse(localStorage.getItem('item')).id, + this.subjectId2).subscribe(res => {
        this.listExamDone = res;
     });
    }

  resultExam(examId: number, examResultId: number){
    this.router.navigate([
      '/hometotal/testresult',
      { param1: examId, param2: examResultId }
    ]);
  }

}
