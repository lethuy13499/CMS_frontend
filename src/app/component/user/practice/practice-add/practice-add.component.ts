
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { subject } from 'src/app/model/subject/subject';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { DomainService } from 'src/app/service/domain/domain.service';
import { Location } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/service/login/user.service';
import { ExamService } from 'src/app/service/exam/exam.service';
import { UploadfileServiceService } from 'src/app/service/questionservice/uploadfile-service.service';
import { tap, switchMap, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
export class DTO {
  chapter: string;
  domain: string;
  number: number;
  tooltip: string;
  constructor(chapter, domain, number, tooltip) {
    this.chapter = chapter;
    this.domain = domain;
    this.number = number;
    this.tooltip = tooltip;
  }
}
function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
function minLengthArray(min: number) {
  return (c: AbstractControl): { [key: string]: any } => {
    if (c.value.length >= min) {
      return null;
    }
    return { minLengthArray: { valid: false } };
  };
}

@Component({
  selector: 'app-practice-add',
  templateUrl: './practice-add.component.html',
  styleUrls: ['./practice-add.component.scss']
})
export class PracticeAddComponent implements OnInit {
  subjects: subject[] = [];
  listChapter = [];
  listDomain = [];
  mapSubject: Map<number, string>;
  addDetail: FormGroup;
  crChapter: string;
  crDomain: string;
  listOpSelect = [];
  listOpSelectCp = [];
  mapNumberQuestion: Map<string, number>;
  isDisable: boolean;
  listNumberQuestionOfDomainAndChapter = [];
  listDataRandom = [];
  isExceedDomainChapter: boolean;
  listRequest = [];
  listIdInit: number[];
  listQuestionOfChapterAndDomain = [];
  error: string;
  isShow: boolean;
  defaultCt: string;
  defaultDm: string;
  ////////////
  subject: subject;
  tempList: number[];
  idsubject: string;
  idChapter: string;
  idDomain: string;
  errorPermission = '';
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  chapterPercen: '';
  domainPercen: '';
  numberQuestion: '';
  numofquestion: number;
  tokens: any;
  code: string;
  creator_id: any;
  practiseType: 1;
  title: string;
  numberOfChapter: number;
  numberOfDomain: number;
  restquestion: number;
  listSelectedRadom = [];
  listQuestionOfSubject: Object[];
  output1: string[];
  output2: string[];
  idExam: Object;
  isExceedTotalQuestion: boolean;
  numberQuestionOfExam: any;
  submmited = false;
  selectedType = 1;
  key = 'null';
  public pattern = /^(0|[1-9][0-9]*)$/;
  listQuestionDomain: FormArray;
  addDetailChapter: FormGroup;
  listQuestionChapter: FormArray;
  maxQuestion: boolean;
  validFrm: boolean;
  isQuestion: boolean;
  errSearch: boolean;
  numSearch: number;
  exam: Object;
  examId: number;
  numberquestionOfDomain: number;
  numberquestionOfChapter: number;
  @ViewChild("namepractice") nameField: ElementRef;
  @ViewChild("subject") subjectField: ElementRef;
  constructor(
    private subjectService: SubjectService,
    private chapterService: ChapterService,
    private domainService: DomainService,
    private jwt: JwtHelperService,
    private questionService: UploadfileServiceService,
    private examService: ExamService,
    private fb: FormBuilder,
    private us: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    // this.tempList.push(0);
    this.error = '';
    this.isShow = true;
    this.isExceedDomainChapter = false;
    this.isExceedTotalQuestion = false;
    this.mapNumberQuestion = new Map();
    this.mapSubject = new Map();
    this.isDisable = true;
    this.validFrm= true;
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    this.tokens = token;
    if (token != null) {
      this.us.getUserbyEmail(token['username']).subscribe(res => {
        this.creator_id = res['id'];
      });
    }
    this.addDetail = this.fb.group({
      // nameofpractise: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.maxLength(100),
      //     Validators.minLength(10),
      //     validatorEmptyInput
      //   ]
      // ],
      numofquestion: [''],
      subject: ['', [Validators.required]],
      code: [''],
      creator_id: [''],
      selectChapter: ['', [Validators.required]],
      selectDomain: ['', [Validators.required]],
      key: ['']
    });
    this.subjectService.getListSubject().subscribe(res => {
      this.subjects = res;
      res.map(x => {
        this.mapSubject.set(x['id'], x['name']);
      });
    });
    // this.listQuestionDomain = this.addDetail.get('detailSelectDomain') as FormArray;
    // this.listQuestionChapter = this.addDetail.get('detailSelectChapter') as FormArray;
  }
  // get getdetailSelect(): FormArray {
  //   return <FormArray>this.addDetail.controls.detailSelect;
  // }
  setRadio(e: number): void
  {
        this.selectedType = e;
  }
  isSelected(number: number): boolean
  { return (this.selectedType === number);
  }
  // get getdetailDomain() {
  //   return this.addDetail.get('detailSelectDomain') as FormArray;
  // }

  // getQuestionDomain(index): FormGroup {
  //   const formGroup = this.listQuestionDomain.controls[index] as FormGroup;
  //   return formGroup;
  // }

  // createDetailDomain(): FormGroup {
  //   return this.fb.group({
  //     tooltip: [''],
  //     selectDomain: ['', Validators.required],
  //     numberQuestion: ['', [Validators.required, Validators.pattern(this.pattern)]]
  //   });
  // }

  // addQuestionDomain() {
  //   this.listQuestionDomain.push(this.createDetailDomain());
  // }

  // removeQuestionDomain(index) {
  //   this.listQuestionDomain.removeAt(index);
  //   this.validFrm = true;
  //   this.isDisable = false;
  // }


  selectDomain(event, index) {
    const value = event.target.value;
    this.addDetail.controls['selectChapter'].clearValidators();
    this.addDetail.controls['selectChapter'].updateValueAndValidity();
    this.addDetail.controls['selectDomain'].setValidators([Validators.required]);
    // this.questionService.getQuestionOfDomain(+value, this.idsubject).subscribe(res => {this.numberquestionOfDomain = res.length;
    
    //   this.listQuestionDomain.controls[index].get('numberQuestion').setValue('');
    //   if (this.numberquestionOfDomain !== 0) {
    //     this.listQuestionDomain.controls[index].get('tooltip').setValue(this.numberquestionOfDomain);
    //     this.isQuestion = false;
    //     this.isDisable = false;
    //   } else {

    //     this.isQuestion = true;
    //     this.listQuestionDomain.controls[index].get('tooltip').setValue(0);
    //     this.isDisable = true;
    //   }
    // } );
    // this.numofquestion = this.addDetail.get("numofquestion").value;
  }

  get getdetailChapter() {
    return this.addDetail.get('detailSelectChapter') as FormArray;
  }

  // getQuestionChapter(index): FormGroup {
  //   const formGroup = this.listQuestionChapter.controls[index] as FormGroup;
  //   return formGroup;
  // }

  // createDetailChapter(): FormGroup {
  //   return this.fb.group({
  //     tooltip: [''],
  //     selectChapter: ['', Validators.required],
  //     numberQuestion: ['', [Validators.required, Validators.pattern(this.pattern)]]
  //   });
  // }

  // addQuestionChapter() {
  //   this.listQuestionChapter.push(this.createDetailChapter());
  // }

  // removeQuestionChapter(index) {
  //   this.listQuestionChapter.removeAt(index);
  //   this.validFrm = true;
  //   this.isDisable = false;
  // }


  selectChapter(event, index) {
    let value = event.target.value;
    this.numofquestion = this.addDetail.get("numofquestion").value;
    this.addDetail.controls['selectDomain'].clearValidators();
    this.addDetail.controls['selectDomain'].updateValueAndValidity();
    this.addDetail.controls['selectChapter'].setValidators([Validators.required]);
    // this.questionService.getQuestionOfChapter(+value, +this.idsubject).subscribe(res => {this.numberquestionOfChapter = res.length;


    //   if (this.numberquestionOfChapter !== 0) {
    //     this.listQuestionChapter.controls[index].get('tooltip').setValue(this.numberquestionOfChapter);
    //     this.isQuestion = false;
    //     this.isDisable = false;
    //   } else {
    //     this.isQuestion = true;
    //     this.listQuestionChapter.controls[index].get('tooltip').setValue(0);
    //     this.isDisable = true;
    //   }
    // } );

  }
  // clearValidatorsDomain() {
  //   this.numSearch = -1;
  //   // this.addDetail.controls['key'.setValue('');
  //   // this.addDetail.get('selectChap').setValue('');
  //   for (let key in this.listQuestionDomain.controls) {
  //     this.listQuestionDomain.controls[key].reset();
  //     // this.listQuestionDomain.controls[key].get('tooltip').setValue(0);
  //     this.listQuestionDomain.controls[key].get('numberQuestion').clearValidators();
  //     this.listQuestionDomain.controls[key].get('selectDomain').clearValidators();
  //     this.listQuestionDomain.controls[key].get('numberQuestion').updateValueAndValidity();
  //     this.listQuestionDomain.controls[key].get('selectDomain').updateValueAndValidity();
  //   }
  // }
  // clearValidatorsChapter() {
  //   this.numSearch = -1;
  //   this.addDetail.controls['key'].setValue('');
  //   for (let key in this.listQuestionChapter.controls) {
  //     this.listQuestionChapter.controls[key].reset();
  //     // this.listQuestionChapter.controls[key].get('tooltip').setValue(0);
  //     this.listQuestionChapter.controls[key].get('numberQuestion').clearValidators();
  //     this.listQuestionChapter.controls[key].get('numberQuestion').updateValueAndValidity();
  //     this.listQuestionChapter.controls[key].get('selectChapter').clearValidators();
  //     this.listQuestionChapter.controls[key].get('selectChapter').updateValueAndValidity();
  //   }
  // }
  // addValidatorsDomain() {
  //   for (let key in this.listQuestionDomain.controls) {
  //     this.listQuestionDomain.controls[key].get('numberQuestion').setValidators([Validators.required, Validators.pattern(this.pattern)]);
  //     this.listQuestionDomain.controls[key].get('selectDomain').setValidators([Validators.required]);
  //   }

  // }

  // addValidatorsChapter() {
  //   for (let key in this.listQuestionChapter.controls) {
  //     this.listQuestionChapter.controls[key].get('numberQuestion').setValidators([Validators.required, Validators.pattern(this.pattern)]);
  //     this.listQuestionChapter.controls[key].get('selectChapter').setValidators([Validators.required]);
  //   }
  // }
  // selectedDomain(event) {
  //   this.crDomain = event.target.value;
  //   if (this.listOpSelectCp.length !== 0) {
  //     if (!this.checkExistDomainChapter(this.crChapter, this.crDomain)) {
  //       if (
  //         (this.crChapter !== '' || this.crChapter !== undefined) &&
  //         (this.crDomain !== '' || this.crDomain !== undefined)
  //       ) {
  //         if (
  //           this.mapNumberQuestion.get(this.crChapter + '' + this.crDomain) !==
  //           undefined
  //         ) {
  //           this.isDisable = true;
  //         }
  //       }
  //     } else {
  //       this.isDisable = false;
  //     }
  //   } else {
  //     if (
  //       (this.crChapter !== '' || this.crChapter !== undefined) &&
  //       (this.crDomain !== '' || this.crDomain !== undefined)
  //     ) {
  //       if (
  //         this.mapNumberQuestion.get(this.crChapter + '' + this.crDomain) !==
  //         undefined
  //       ) {
  //         this.isDisable = true;
  //       } else {
  //         this.isDisable = false;
  //       }
  //     }
  //   }
  // }
  // checkExistDomainChapter(chapter, domain): boolean {
  //   for (let i = 0; i < this.listOpSelectCp.length; i++) {
  //     if (
  //       this.listOpSelectCp[i]['chapter'] +
  //         '' +
  //         this.listOpSelectCp[i]['domain'] ===
  //       chapter + '' + domain
  //     ) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // onAdd(control) {
  //   if (
  //     this.mapNumberQuestion.get(this.crChapter + this.crDomain) !== undefined
  //   ) {
  //     if(this.addDetail.get('numberQuestion').value !== ''){
  //       if (
  //         +this.mapNumberQuestion.get(this.crChapter + this.crDomain) <
  //         this.addDetail.get('numberQuestion').value
  //       ) {
  //         alert("Vượt quá số lượng câu hỏi! Mời bạn chọn lại");
  //         this.isDisable = false;
  //       } else {
  //         this.listOpSelect.push({
  //           chapter: this.crChapter,
  //           domain: this.crDomain,
  //           number: this.addDetail.get('numberQuestion').value,
  //           tooltip: this.mapNumberQuestion
  //             .get(this.crChapter + '' + this.crDomain)
  //             .toString()
  //         });
  //         this.listOpSelectCp = [];
  //         for (let i = 0; i < this.listOpSelect.length; i++) {
  //           const temp = new DTO(
  //             this.listOpSelect[i]['chapter'],
  //             this.listOpSelect[i]['domain'],
  //             this.listOpSelect[i]['number'],
  //             this.listOpSelect[i]['tooltip']
  //           );
  //           this.listOpSelectCp[i] = temp;
  //         }
  //         this.addDetail.get('numberQuestion').patchValue('');
  //         this.addDetail.get('selectChapter').patchValue('');
  //         this.addDetail.get('selectDomain').patchValue('');
  //         this.getdetailSelect.controls = [];
  //         this.listOpSelect.forEach(x => {
  //           this.getdetailSelect.push(
  //             this.fb.group({
  //               chapter: x['chapter'],
  //               domain: x['domain'],
  //               number: x['number'],
  //               tooltip: x['tooltip']
  //             })
  //           );
  //         });
  //       }
  //     } else {
  //       alert("Phải chọn số câu hỏi!");
  //     }
  //   } else {
  //     //this.isDisable = false;
  //     alert("Phải chọn chương và kỹ năng!");
  //   }
  // }
  // validateMax(value, index) {
  //   let maxQuestion = this.listQuestionDomain.controls[index].get('tooltip').value;
  //   if (
  //     this.numofquestion < +value || maxQuestion < +value
  //   ) {
  //     this.isDisable = true;
  //     this.validFrm = true;
  //     this.maxQuestion = true;
  //   } else if (this.checkDomain(index)) {
  //     this.isDisable = true;
  //     this.validFrm = true;
  //     this.maxQuestion = true;
  //   } else if (this.numofquestion == this.countNumQuestion()) {
  //     this.isDisable = true;
  //     this.maxQuestion = false;
  //     this.validFrm = false;
  //   } else {
  //     this.isDisable = false;
  //     this.validFrm = true;
  //     this.maxQuestion = false;
  //   }
  // }

  // validateMaxChapter(value, index) {
  //   let maxQuestion = this.listQuestionChapter.controls[index].get('tooltip').value;
  //   if (
  //     this.numofquestion < +value || maxQuestion < +value
  //   ) {
  //     this.isDisable = true;
  //     this.validFrm = true;
  //     this.maxQuestion = true;
  //   } else if (this.checkChapter(index)) {
  //     this.isDisable = true;
  //     this.validFrm = true;
  //     this.maxQuestion = true;
  //   } else if (this.numofquestion == this.countNumQuestionChapter()) {
  //     this.isDisable = true;
  //     this.maxQuestion = false;
  //     this.validFrm = false;
  //   } else {
  //     this.isDisable = false;
  //     this.validFrm = true;
  //     this.maxQuestion = false;
  //   }
  // }

  // countNumQuestionChapter() {
  //   let count = 0;
  //   for (let index = 0; index < this.listQuestionChapter.length; index++) {
  //     count += +this.listQuestionChapter.controls[index].get('numberQuestion').value;
  //   }
  //   return count;
  // }

  // checkChapter(index) {
  //   let domainId = +this.listQuestionChapter.controls[index].get('selectChapter').value;
  //   let maxQuestion = +this.listQuestionChapter.controls[index].get('tooltip').value;
  //   let num = 0;
  //   for (let index = 0; index < this.listQuestionChapter.length; index++) {
  //     if (this.listQuestionChapter.controls[index].get('selectChapter').value == domainId)
  //       num += +this.listQuestionChapter.controls[index].get('numberQuestion').value;
  //   }
  //   if (num > maxQuestion) {
  //     return true;
  //   } else if (this.numofquestion < this.countNumQuestionChapter()) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // countNumQuestion() {
  //   let count = 0;
  //   for (let index = 0; index < this.listQuestionDomain.length; index++) {
  //     count += +this.listQuestionDomain.controls[index].get('numberQuestion').value;
  //   }
  //   return count;
  // }

  // checkDomain(index) {
  //   let domainId = +this.listQuestionDomain.controls[index].get('selectDomain').value;
  //   let maxQuestion = +this.listQuestionDomain.controls[index].get('tooltip').value;
  //   let num = 0;
  //   for (let index = 0; index < this.listQuestionDomain.length; index++) {
  //     if (this.listQuestionDomain.controls[index].get('selectDomain').value == domainId)
  //       num += +this.listQuestionDomain.controls[index].get('numberQuestion').value;
  //   }
  //   if (num > maxQuestion) {
  //     return true;
  //   } else if (this.numofquestion < this.countNumQuestion()) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  generateQuestion(idExam) {
    const check = 0;
    let numberquestionselect = 0;
    this.listDataRandom = [];
    for (let i = 0; i < this.addDetail.value['detailSelect'].length; i++) {
      const object = {};
      object['stt'] = i;
      object['slcauhoi'] = this.addDetail.value['detailSelect'][i]['number'];
      if (this.isValid(i)) {
        this.isExceedDomainChapter = true;
        return;
      }
      numberquestionselect += +this.addDetail.value['detailSelect'][i][
        'number'
      ];
      object['chapter'] = this.addDetail.value['detailSelect'][i]['chapter'];
      object['domain'] = this.addDetail.value['detailSelect'][i]['domain'];
      this.listDataRandom.push(object);
    }

    if (
      //+this.addDetail.get('numofquestion').value >= numberquestionselect &&
      check === 0
    ) {
      this.listRequest = [];
      for (let i = 0; i < this.listDataRandom.length; i++) {
        // tslint:disable-next-line:max-line-length
        const val = this.listDataRandom[i];
        if (val['slcauhoi'] === undefined) {
          val['slcauhoi'] = 0;
        }
        const request = this.questionService.getListQuestionRandomByChapTerAndDomain(
          this.idsubject,
          +val['domain'],
          +val['chapter'],
          +val['slcauhoi']
        );
        this.listRequest.push(request);
      }
      this.listIdInit = [];
      forkJoin(this.listRequest)
        .pipe(
          tap(output => {
            let ok = 0;
            output = [].concat.apply([], output);
            this.listQuestionOfChapterAndDomain = [];
            this.listQuestionOfChapterAndDomain = [].concat.apply([], output);
            this.restquestion =
              +this.addDetail.get('numofquestion').value -
              this.listQuestionOfChapterAndDomain.length;
            if (this.listQuestionOfChapterAndDomain.length === 0) {
              ok = 1;
              this.listQuestionOfChapterAndDomain.push({ id: 0 });
            }
            this.listIdInit = [];
            this.listIdInit = this.listQuestionOfChapterAndDomain.map(
              x => x['id']
            );
            if (ok === 1) {
              this.listQuestionOfChapterAndDomain = [];
            }
          }),
          switchMap(output =>
            this.questionService.getLisgetListRestQuestionRandom(
              this.restquestion,
              this.listIdInit,
              this.idsubject
            )
          ),
          tap(output2 => {
            this.listQuestionOfChapterAndDomain = this.listQuestionOfChapterAndDomain.concat(
              output2
            );
            this.listIdInit = this.listQuestionOfChapterAndDomain.map(
              x => x['id']
            );
          }),
          switchMap(output3 =>
            this.examService.updateExamDetail(this.listIdInit, idExam, -1, null)
          )
        )
        .subscribe(res => {
          if (res['response'] === 'success') {
            this.router.navigate(['/hometotal/examhistory']);
          }
        });
    } else {
      this.isExceedTotalQuestion = true;
    }
  }
  // selectArray(event, index) {
  //   const chapter = this.addDetail.get('detailSelect')['controls'][index][
  //     'controls'
  //   ]['chapter']['value'];
  //   const domain = this.addDetail.get('detailSelect')['controls'][index][
  //     'controls'
  //   ]['domain']['value'];
  //   if (!this.checkExistDomainChapter(chapter, domain)) {
  //     this.listOpSelectCp[index]['chapter'] = chapter;
  //     this.listOpSelectCp[index]['domain'] = domain;
  //     if (this.mapNumberQuestion.get(chapter + '' + domain) === undefined) {
  //       this.addDetail
  //         .get('detailSelect')
  //         ['controls'][index]['controls']['number'].patchValue(0);
  //       this.addDetail
  //         .get('detailSelect')
  //         ['controls'][index]['controls']['tooltip'].patchValue(0);
  //     } else {
  //       this.addDetail
  //         .get('detailSelect')
  //         ['controls'][index]['controls']['tooltip'].patchValue(
  //           this.mapNumberQuestion.get(chapter + '' + domain)
  //         );
  //     }
  //   } else {
  //     this.addDetail
  //       .get('detailSelect')
  //       ['controls'][index]['controls']['chapter'].patchValue(
  //         this.listOpSelect[index]['chapter']
  //       );
  //     this.addDetail
  //       .get('detailSelect')
  //       ['controls'][index]['controls']['domain'].patchValue(
  //         this.listOpSelect[index]['domain']
  //       );
  //     this.addDetail
  //       .get('detailSelect')
  //       ['controls'][index]['controls']['tooltip'].patchValue(
  //         this.listOpSelect[index]['tooltip']
  //       );
  //   }
  // }
  onSubmitInsert() {
    const { valid, value } = this.addDetail;
    console.warn(valid);
    console.log(value);
    if (valid) {
      let subjectName = this.mapSubject.get(+this.idsubject);
      subjectName += '';
      this.code = subjectName
        .split(' ')
        .map(x => x[0])
        .reduce((a, b) => a + b);
      this.code += Math.floor(Math.random() * 10000 + 1);
    //  this.addDetail.get('numofquestion').setValue(this.numofquestion);
      this.addDetail.get('creator_id').setValue(this.creator_id);
      this.addDetail.get('code').setValue(this.code);
      const data = new FormData();
      data.append('formdata', JSON.stringify(this.addDetail.value));
      this.examService.savePractiseExam(data).subscribe(
        res => {
          this.router.navigate([
            '/hometotal/testpractice',
            { param1: res['exam']['id'], param2: res['id'] }
          ]);
        },
        err => {
          this.error = err.error.message;
        }
      );
    //  this.router.navigate(['/hometotal/practice']);
    } else {
      this.isShow = true;
      if(this.addDetail.get('nameofpractise').value === '' ||
      this.addDetail.get('nameofpractise').validator.length < 10 ||
      this.addDetail.get('nameofpractise').validator.length >= 100){
        this.nameField.nativeElement.focus();
        this.addDetail.get('nameofpractise').errors;
        this.addDetail.get('nameofpractise').touched;
        this.submmited = true;
        return;
      }else {
        this.submmited = false;
      }
      if(this.addDetail.get('subject').value === ''){
        this.subjectField.nativeElement.focus();
        this.addDetail.get('subject').errors;
        this.addDetail.get('subject').touched;
        this.submmited = true;
        return;
      }else {
        this.submmited = false;
      }
    }
  }
  // deleteOption(event, i) {
  //   // tslint:disable-next-line:no-unused-expression
  //   const temp = +this.addDetail.value['detailSelect'][i]['number'];
  //   const chapter = this.addDetail.value['detailSelect'][i]['chapter'];
  //   const domain = this.addDetail.value['detailSelect'][i]['domain'];
  //   this.listOpSelect.splice(i, 1);
  //   this.listOpSelect.splice(i, 1);
  //   this.listOpSelectCp.splice(i, 1);
  //   event.removeAt(i);
  // }
  onBack() {
    this.location.back();
  }
  onChange(event) {
    this.listNumberQuestionOfDomainAndChapter = [];
    this.idsubject = event.target.value;
    this.defaultDm = '';
    this.defaultCt = '';
    this.listDomain = [];
    this.listChapter = [];

    // const arr = <FormArray>this.addDetail.controls.detailSelect;
    // arr.controls = [];
    // this.listOpSelectCp = [];
    // this.listOpSelect = [];
    // this.questionService
    //   .getNumberQuestionOfChapterAndDomain(this.idsubject)
    //   .subscribe(res => {
    //     this.listNumberQuestionOfDomainAndChapter = res;
    //     this.listNumberQuestionOfDomainAndChapter.map(x => {
    //       this.mapNumberQuestion.set(x[1] + '' + x[2], x[0]);
    //     });
    //   });
    //   console.log(this.mapNumberQuestion)
    // this.domainService.getLisDomainBySubject(+this.idsubject).subscribe(res => {
    //   this.domains = res;
    // });
    // this.chapterService
    //   .getLisChapterBySubjectAndParent(+this.idsubject)
    //   .subscribe(res => {
    //     this.chapters = res;
    //   });

      let dataChapter = this.chapterService.getLisChapterBySubject(+this.idsubject)
      let chapter = dataChapter.pipe(concatMap(val => of(val)));
      chapter.subscribe(res => {
        this.listChapter = res;
        this.listChapter.unshift('');
      });
      let dataDomain = this.domainService.getDomainBySubjectId(+this.idsubject)
      let domain = dataDomain.pipe(concatMap(val => of(val)));
      domain.subscribe(res => {
        this.listDomain = res;
        this.listDomain.unshift('');
      });

  }
  isValid(i: number): boolean {
    if (i != null) {
      if (
        this.addDetail.value['detailSelect'][i]['number'] >
        +this.addDetail.value['detailSelect'][i]['tooltip']
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  checkSpaceName(event) {
    const val = event.target.value;
    this.addDetail.get('nameofpractise').setValue(val.replace(/\s\s+/g, ' '));
  }
  mess: string;
  search() {
    let key = this.addDetail.controls['key'].value;
    if(key != ''){
      this.questionService.countSeartQuestion(this.exam[1], key).subscribe(res => {
        this.numSearch = +res;
        if (+this.exam[0] > this.numSearch) {
          this.errSearch = true;
          this.validFrm = true;
          this.mess = "Không đủ câu hỏi!";
        } else if (+this.exam[0] <= this.numSearch) {
          this.validFrm = false;
          this.errSearch = false;
        }
      })
    }else{
      this.errSearch = true;
      this.mess = "Chưa nhập từ khóa!";
      this.validFrm = true;
    }

  }
  selectSearch(){
    this.addDetail.controls['selectChapter'].clearValidators();
    this.addDetail.controls['selectChapter'].updateValueAndValidity();
    this.addDetail.controls['selectDomain'].clearValidators();
    this.addDetail.controls['selectDomain'].updateValueAndValidity();
  }
}
