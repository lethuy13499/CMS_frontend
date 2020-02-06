import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ExamService } from 'src/app/service/exam/exam.service';
import { DatatranferService } from 'src/app/service/datatranfer/datatranfer.service';
import { NotifierService } from 'angular-notifier';
import { ExamDetailAdminComponent } from '../../exam-detail-admin/exam-detail-admin.component';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd, ParamMap } from '@angular/router';
import { Constant } from 'src/app/common/constant';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}

function validatorNumberTrial(
  control: AbstractControl
): { [key: string]: boolean } | null {
  debugger
  let isValid = true;
  let { endTime, examType, numberTrial, startTime } = control['controls'];
  const isWhitespace = (numberTrial.value === null ? '' : numberTrial.value + '').length == 0;
  const isWhitespace1 = (startTime.value === null ? '' : startTime.value + '').length == 0;
  const isWhitespace2 = (endTime.value === null ? '' : endTime.value + '').length == 0;
  // && (numberTrial.touched || endTime.touched || startTime.touched)
  if (examType.value == 2)
    isValid = !isWhitespace && !isWhitespace1 && !isWhitespace2;
  return isValid ? null : { nothavetrial: true };
}

@Component({
  selector: 'app-exam-overview',
  templateUrl: './exam-overview.component.html',
  styleUrls: ['./exam-overview.component.scss']
})
export class ExamOverviewComponent implements OnInit {

  dataThumb: any;
  examId: any;
  img: string;
  listSubject = [];
  examForm: FormGroup;
  examById: any;
  date: Date = new Date('');
  baseURL: any;
  changeStartDate: any;
  changeEndDate: any;
  changeTrial: any;

  constructor(
    private subjectService: SubjectService,
    private fb: FormBuilder,
    private examService: ExamService,
    private tranfer: DatatranferService,
    private notifier: NotifierService,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private router: Router

  ) { }

  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    this.route.parent.params
      .subscribe(paramsParent => {
        // Get parent route param
        this.examId = paramsParent['id'];
        // this.passExamId(this.examId)
      });

    this.examForm = this.fb.group({
      id: [''],
      examName: [
        '',
        [Validators.required, Validators.maxLength(250), validatorEmptyInput]
      ],
      subject: [
        '',
        [Validators.required,]
      ],
      numQuestions: ['', [Validators.required, validatorEmptyInput]],
      duration: [
        '', [Validators.required, validatorEmptyInput],
      ],

      questionsConfig: ['', [Validators.required]],
      examTrial: this.fb.group({
        examType: ['', [Validators.required]],
        numberTrial: [{
          value: '',
          disabled: true
        }],
        startTime: [''],
        endTime: ['']
      },

        {
          validator: [validatorNumberTrial]
        }
      ),

      status: ['', [Validators.required]],
      passRate: ['', [Validators.required, validatorEmptyInput]],

      // thumbnail: [
      //   '',
      // ],

    });
    this.examForm.get('status').setValue('0');

    if (this.examId != null) {
      this.examService.getExamById(this.examId).subscribe(
        res => {
          this.examById = res;
          // if (!this.checkDisableExamMode(this.examById)) {
          //   this.examForm.get('examType').disable();

          // }

          this.checkDisableExamMode(this.examById).subscribe(res1 => {
            //

            if (res1 === false) this.examForm.get('examType').disable();
          });
          this.img = this.baseURL + '/resources/images/thumbnail/' +
            this.examById.image

          this.examForm.patchValue({
            id: this.examId,
            examName: this.examById.name,
            subject: this.examById.subject.id,
            numQuestions: this.examById.question_num,

            duration: this.examById.time,
            examTrial: {
              examType: this.examById.examMode,
              numberTrial: this.examById.max_attempt,
              startTime: this.examById.start_date == null ? '' : this.examById.start_date,
              endTime: this.examById.end_date == null ? '' : this.examById.end_date,
            },
            questionsConfig: this.examById.create_type,
            status: this.examById.status,
            passRate: this.examById.percent_passing,
          });
        }
      )

    }
    this.subjectService.getListSubject().subscribe(
      res => {
        this.listSubject = res;
      }
    )
  }



  readURL(event) {

    this.dataThumb = event.target.files[0];
    // let imageSelected = userFile.name;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.img = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  submitExam() {
    // this.examForm.get('numberTrial').setValue(this.examForm.get('numberTrial').value);

    if (this.examForm.valid) {
      const formdata = new FormData();
      formdata.append('exam', JSON.stringify(this.examForm.getRawValue()));
      formdata.append('image', this.dataThumb);
      this.examService.createExam(formdata).subscribe(
        res => {

          this.router.navigate(['/cms/exam/details/' + res.id]);
          this.notifier.notify('success', 'Create exam success!');
        }
      );
    }

  }

  updateExam() {
    // this.examForm.get('examType').setValue(this.examForm.get('examType').value);

    if (this.examForm.valid) {
      const formdata = new FormData();
      formdata.append('exam', JSON.stringify(this.examForm.getRawValue()));
      formdata.append('image', this.dataThumb);
      this.examService.updateExam(formdata).subscribe(
        res => {
          // this.passExamId(res)
          const value = this.examForm.get('questionsConfig').value;
          this.tranfer.passExamConfig(value);
          this.notifier.notify('success', 'Update exam success!');
          // location.reload(true);
          // this.router.navigate(['/cms/exam']);
        }

      );
    }

  }

  passExamId(id: number) {
    // let pass = {
    //   key: key,
    //   value: value
    // }
    this.tranfer.passExamId(id);
  }

  checkDisable() {
    let l = this.examForm.get('examType').value
    if (l == 2) {
      this.examForm.get('numberTrial').enable();
    } else {
      this.examForm.get('numberTrial').disable();
    }

  }

  checkDisableExamMode(exam: any) {
    let subject = new BehaviorSubject<boolean>(true);
    if (exam.examMode == 0) {
      subject.next(true);
    }
    else {
      this.examService.getExamUserByExamId(exam.id).subscribe(
        res => {
          if (res.length > 0) {

            subject.next(false);
          }
          else {

            subject.next(true);
          }
        }
      );
    }
    return subject.asObservable();
  }

  back() {
    this.router.navigate(['/cms/exam'])
  }

  changeExamMode() {
    if (this.examForm.get('examTrial').get('examType').value == 1)
      this.examForm.get('examTrial').get('numberTrial').setValue(1);
    else if (this.examForm.get('examTrial').get('examType').value == 0)
      this.examForm.get('examTrial').get('numberTrial').setValue('');
  }
  changeNumberTrial(e) {

    this.changeTrial = e.target.value == '' ? true : false;
    // console.log("trial change:", this.changeTrial)

  }
  changeStartTime(e) {
    this.changeStartDate = e.target.value;
  }
  changeEndTime(e) {
    this.changeEndDate = e.target.value;
  }
}
