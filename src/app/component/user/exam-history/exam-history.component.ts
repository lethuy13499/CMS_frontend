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
import { Exam } from 'src/app/model/exam/exam';

export interface Result {
  exam: Object;
  result: Object[];
}
export interface Resultp {
  practice: Object;
  resultp: Object[];
}

@Component({
  selector: 'app-exam-history',
  templateUrl: './exam-history.component.html',
  styleUrls: ['./exam-history.component.scss']
})
export class ExamHistoryComponent implements OnInit {
  perPage: number;
  listExam: Object[] = [];
  email: string;
  userID: number;
  idExam: number;
  listId: number[];
  examResult: Object;
  listExamDone: Object[] = [];
  listPracticeDone: Object[] = [];
  examComingSoon: Exam[] = [];
  listRequest = [];
  showTestTags = false;
  listResult: Result[] = [];
  listResultp: Resultp[] = [];
  examResultID: Number;
  baiThiStatus = true;
  thucHanhSatus = false;
  hocStatus = false;
  notificationVisibilityWhenDelete1 = false;
  notificationVisibilityWhenDelete2 = false;
  listExamResultByUserIDExamID: Object[] = [];
  photo: string;
  nowDate: number;
  searchBoolean = true;
  showtable: Boolean = true;
  mapNameSubject: Map<number, string>;
  tenBaiThi: string;
  chuDeBaiThi: string;
  examResultID2: Number;
  examResultCount: Object;
  subjects: subject[] = [];
  mapSubject: Map<number, string>;
  subjectId1: number;
  subjectId2: number;
  ketqua = false;
  //start class
  listClass : Class[] =[];
  showTable: Boolean = true;
   //end
  @ViewChild('popupthilai') popupthilai: Popup;
  @ViewChild('popuppractice') popuppratice: Popup;
  @ViewChild('popupexam') popupexam: Popup;
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

  ) {
    this.activeRoute.paramMap
      .pipe(
        map(params => {
          if (params.get('param1') === '') {
            this.baiThiStatus = true;
            this.thucHanhSatus = false;
          }
          // }else if (params.get('param1') === 'false'  &&  params.get('param2') === 'false') {
          //   this.khoaHoc(true);
          //   this.hocStatus = false;
          //   this.thucHanhSatus = false;
          // }
          else if (params.get('param1') === 'false' ) {
            this.xemBaiThucHanh(true);
          }
        })
      )
      .subscribe();
  }

  ngOnInit() {
       //this.nowDate = +new Date();
    // this.notificationVisibilityWhenDelete = false;
   // this.notificationVisibilityWhenDelete1 = false;
    this.photo =
      Constant.BASE_URL +
      '/resources/images/slidebars/' +
      this.us.userLogin.img;
    this.titleService.setTitle('Testonline System - Dashboard');
    // Get list exam user ASC by end_date
    // this.userserviceService
    //   .getListExamOfUserASCBYEndDate(
    //     JSON.parse(localStorage.getItem('item')).id
    //   )
    //   .subscribe(res4 => {
    //
    //     this.userserviceService.listExamASC = res4;
    //     this.userserviceService.sizeExamAssign = res4.length;
    //   });

    //Get list exam done
    this.userserviceService.getListExamCompletedByUser(JSON.parse(localStorage.getItem('item')).id).subscribe(res => {
         this.listExamDone = res;
      });

    //Get list PRACTICE done
    this.examService.getResultPractice(JSON.parse(localStorage.getItem('item')).id).subscribe( res => {
      this.listPracticeDone = res;
    });

    //Get list Subject
    this.subjectService.getListSubject().subscribe(res => {
      this.subjects = res;
    });

    //Get list exam coming soon
    this.examService.getExamComingSoon(JSON.parse(localStorage.getItem('item')).id).subscribe( res => {
      this.examComingSoon = res;
      if(this.examComingSoon.length === 0){
        this.ketqua = false;
      }else {
        this.ketqua = true;      
      }
    })

    // this.userserviceService
    // .getListPracticeCompletedByUser(JSON.parse(localStorage.getItem('item')).id)
    // .subscribe(res8 => {
    //   this.listPracticeDone = res8;
    //   this.listPracticeDone.forEach(element1 => {
    //     this.examService
    //       .getExamResultPractice(JSON.parse(localStorage.getItem('item')).id)
    //       .subscribe(res9 => {
    //         const resultp: Resultp = {
    //           practice: null,
    //           resultp: []
    //         };
    //         resultp.practice = element1;
    //         resultp.resultp = res9;
    //         this.listResultp.push(resultp);
    //         this.listResultp.sort(function(obj1, obj2) {
    //           return obj2.practice[0] - obj1.practice[0];
    //         });
    //       });
    //   });
    // });
    // list class

    // this.classService.getListClass(JSON.parse(localStorage.getItem('item')).id).subscribe((res: Class[]) => {
    //   this.listClass = res;

    // });

      }

  onChangeTH(event) {
    this.subjectId1 = event.target.value;
    this.examService.getExamResultPractice(JSON.parse(localStorage.getItem('item')).id,+this.subjectId1).subscribe( res => {
      this.listPracticeDone = res;
    })
  }

  onChangeThi(event) {
    this.subjectId2 = event.target.value;
    this.userserviceService.getListExamByUserAndSubject(JSON.parse(localStorage.getItem('item')).id,+this.subjectId2).subscribe(res => {
      this.listExamDone = res;
   });
  }

  ClickButton(id1, id2) {
    this.router.navigate([
      '/hometotal/testresult',
      { param1: id1, param2: id2 }
    ]);
  }
  // Xem chi tiet bai thi duoc assigned
  clickXemChiTiet(id: number, quahan: boolean) {
    this.router.navigate([
      '/hometotal/examdetail',
      { paramId: id, paramQuahan: quahan, paramQualuot: false }
    ]);
  }

  // Click vào thi lại
  clickVaoThiP(id) {
    this.idExam = id;
    this.popupthilai.options = {
      header: 'Thi lại',
      color: '#2869bd',
      confirmBtnClass: 'btn btn-primary',
      confirmBtnContent: 'Xác nhận',
      cancleBtnClass: 'btn btn-default',
      cancleBtnContent: 'Hủy',
      widthProsentage: 30,
      animation: 'bounceIn'
    };
    this.popupthilai.show(this.popupthilai.options);
  }

  // Xử lý sự kiến click vào thi thực hành POP UP xuất hiện để confirm
  clickVaoThi1(id: number, ten: string, chude: string) {
    this.idExam = id;
    this.tenBaiThi = ten;
    this.chuDeBaiThi = chude;
    this.popuppratice.options = {
      header: 'Thi',
      color: '#2869bd',
      confirmBtnClass: 'btn btn-primary',
      confirmBtnContent: 'Xác nhận',
      cancleBtnClass: 'btn btn-default',
      cancleBtnContent: 'Hủy',
      widthProsentage: 30,
      animation: 'bounceIn'
    };
    this.popuppratice.show(this.popuppratice.options);
  }

  // Xử lý sự kiến click vào thi exam POP UP xuất hiện để confirm
  clickVaoThi(id: number, ten: string, chude: string) {
    this.idExam = id;
    this.tenBaiThi = ten;
    this.chuDeBaiThi = chude;
    this.popuppratice.options = {
      header: 'Thi',
      color: '#2869bd',
      confirmBtnClass: 'btn btn-primary',
      confirmBtnContent: 'Xác nhận',
      cancleBtnClass: 'btn btn-default',
      cancleBtnContent: 'Hủy',
      widthProsentage: 30,
      animation: 'bounceIn'
    };
    this.popupexam.show(this.popupexam.options);
  }
  // Xử lý sự kiến click vào YES trong POP UP thì bắt đầu vào thi
  oncg1() {
      const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
      const examResult = {
        email: token['username'],
        exam_id: this.idExam,
        code: ''
      };
      const formData = new FormData();
      formData.append('examUser', JSON.stringify(examResult));
      this.examService.getStartExam(formData).subscribe(
        res => {
          this.examResultID = res;
          this.router.navigate([
            '/hometotal/testpractice',
            { param1: this.idExam, param2: this.examResultID }
          ]);
        },
        error => {

        }
      );
  }

  oncg2() {
      const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
      const examResult = {
        email: token['username'],
        exam_id: this.idExam
      };
      const formData = new FormData();
      formData.append('examResult', JSON.stringify(examResult));
      this.examService.getStartExam(formData).subscribe(
        res => {
          this.examResultID = res;
          this.router.navigate([
            '/hometotal/testprocess',
            {
              param1: this.idExam,
              param2: this.examResultID,
              param3: this.tenBaiThi,
              param4: this.chuDeBaiThi
            }
          ]);
        },
        error => {

        }
      );
  }
  // Xem ket qua bai da thi
  clickKetQua(id1) {
    this.examService
      .getListExamResultByUserIDExamID(this.userID, id1)
      .subscribe(res => {
        this.listExamResultByUserIDExamID = res;
        this.examResultID2 = res['id'];
      });
    this.router.navigate([
      '/hometotal/testresult',
      { param1: id1, param2: this.examResultID2 }
    ]);
  }

  // Xem bài thi
  xemBaiThi(para) {
    this.baiThiStatus = para;
    this.thucHanhSatus = !para;
    this.hocStatus = !para;
  }

  // Xem bài thực hành
  xemBaiThucHanh(para) {
    this.thucHanhSatus = para;
    this.baiThiStatus = !para;
    this.hocStatus = !para;
  }
  // Xem khóa học

  khoaHoc(para){
    this.hocStatus = para;
    this.baiThiStatus =!para;
    this.thucHanhSatus =!para;
  }
  hamCheckQuaHan(param: any) {
    const da = new Date(param).getTime();
    if (da < new Date().getTime()) {
      return true;
    } else {
      return false;
    }
  }

  chechkq(param: any){
    if(param === 2){
      return true;
    }else {
      return false;
    }
  }

  checkVaoThi(param: any){
    if(param === 1 || param === 0){
      return false;
    }else{
      return true;
    }
  }

  resultExam(examId: number, examResultId: number){
    this.router.navigate([
      '/hometotal/testresult',
      { param1: examId, param2: examResultId }
    ]);
  }

}

