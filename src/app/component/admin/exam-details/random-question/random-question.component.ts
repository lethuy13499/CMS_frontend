import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, tap, concatMap } from 'rxjs/operators';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ExamService } from 'src/app/service/exam/exam.service';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { DomainService } from 'src/app/service/domain/domain.service';
import { chapter } from 'src/app/model/chapter/chapter';
import { of } from 'rxjs';
import { UploadfileServiceService } from 'src/app/service/questionservice/uploadfile-service.service';
import { ExamSetting } from 'src/app/model/examSetting/ExamSetting';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-random-question',
  templateUrl: './random-question.component.html',
  styleUrls: ['./random-question.component.scss']
})
export class RandomQuestionComponent implements OnInit, AfterViewChecked {
  examId: number;
  isType: number;
  exam: Object;
  mapNumberQuestion: Map<number, number>;
  examSetting: ExamSetting[] = [];
  listChapter = [];
  listDomain = [];
  listNumberQuestion = [];
  addDetail: FormGroup;
  listQuestionDomain: FormArray;
  addDetailChapter: FormGroup;
  listQuestionChapter: FormArray;
  isDisable: boolean;
  maxQuestion: boolean;
  validFrm: boolean;
  isQuestion: boolean;
  errSearch: boolean;
  numSearch: number;
  public pattern = /^(0|[1-9][0-9]*)$/;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private domainService: DomainService,
    private notifier: NotifierService,
    private chapterService: ChapterService,
    private questionService: UploadfileServiceService,
    private examService: ExamService,
    private fb: FormBuilder,
  ) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.activatedRoute.parent.params
      .subscribe(paramsParent => {
        this.examId = +paramsParent['id']
      });
    this.isDisable = true;
    this.isQuestion = false;
    this.errSearch = false;
    this.validFrm = true;
    this.numSearch = -1;
    this.mapNumberQuestion = new Map();
    this.addDetail = this.fb.group({
      keyword: [''],
      detailSelectChapter: this.fb.array([this.createDetailChapter()]),
      detailSelectDomain: this.fb.array([this.createDetailDomain()])
    });
    this.listQuestionDomain = this.addDetail.get('detailSelectDomain') as FormArray;
    this.listQuestionChapter = this.addDetail.get('detailSelectChapter') as FormArray;
    this.loadExamSetting();
    this.examService.getNumAndSubjectById(this.examId).subscribe(res => {
      this.exam = res
      let dataChapter = this.chapterService.getLisChapterBySubjectAndParent(this.exam[1])
      let chapter = dataChapter.pipe(concatMap(val => of(val)));
      chapter.subscribe(res => {
        this.listChapter = res;
        this.listChapter.unshift('');
      });
      let dataDomain = this.domainService.getDomainBySubjectId(this.exam[1])
      let domain = dataDomain.pipe(concatMap(val => of(val)));
      domain.subscribe(res => {
        this.listDomain = res;
        this.listDomain.unshift('');
      });

    })

  }

  loadExamSetting() {
    this.examService.getExamSettingByExamId(this.examId).subscribe(res => {
      this.examSetting = res;
      if (this.examSetting.length > 0) {
        if (this.examSetting[0].keyword != '') {
          this.isType = 0;
          this.addDetail.controls['keyword'].setValue(this.examSetting[0].keyword);
          this.validFrm = false;
          this.removeAllArrayForm(this.listQuestionDomain)
          this.removeAllArrayForm(this.listQuestionChapter);
          this.addQuestionDomain();
          this.addQuestionChapter();
        } else if (this.examSetting[0].chapter_id != 0) {
          this.isType = 1;
          this.questionService
            .getNumberQuestionOfChapter(this.examSetting[0].subject_id)
            .subscribe(res => {
              let list = res;
              list.map(x => {
                this.mapNumberQuestion.set(x[1], x[0]);
              });
              this.removeAllArrayForm(this.listQuestionChapter);
              this.removeAllArrayForm(this.listQuestionDomain);
              this.addQuestionDomain();
              for (let i = 0; i < this.examSetting.length; i++) {
                this.addQuestionChapter();
                this.listQuestionChapter.controls[i].get('selectChapter').setValue(this.examSetting[i].chapter_id);
                this.listQuestionChapter.controls[i].get('numberQuestion').setValue(this.examSetting[i].percentage);
                this.listQuestionChapter.controls[i].get('tooltip').setValue(this.mapNumberQuestion.get(this.examSetting[i].chapter_id));
              }
              this.clearValidatorsDomain();
              this.validFrm = false;
              this.isDisable = true;
            });
        } else if (this.examSetting[0].domain_id != 0) {
          this.isType = 2;
          this.questionService
            .getNumberQuestionOfDomain(this.examSetting[0].subject_id)
            .subscribe(res => {
              let list = res;
              list.map(x => {
                this.mapNumberQuestion.set(x[1], x[0]);
              });
              this.removeAllArrayForm(this.listQuestionDomain)
              this.removeAllArrayForm(this.listQuestionChapter);
              this.addQuestionChapter();
              for (let i = 0; i < this.examSetting.length; i++) {
                this.addQuestionDomain();
                this.listQuestionDomain.controls[i].get('selectDomain').setValue(this.examSetting[i].domain_id);
                this.listQuestionDomain.controls[i].get('numberQuestion').setValue(this.examSetting[i].percentage);
                this.listQuestionDomain.controls[i].get('tooltip').setValue(this.mapNumberQuestion.get(this.examSetting[i].domain_id));
              }
              this.clearValidatorsChapter();
              this.validFrm = false;
              this.isDisable = true;
            });
        }
      }
    })
  }

  get getdetailDomain() {
    return this.addDetail.get('detailSelectDomain') as FormArray;
  }

  getQuestionDomain(index): FormGroup {
    const formGroup = this.listQuestionDomain.controls[index] as FormGroup;
    return formGroup;
  }

  createDetailDomain(): FormGroup {
    return this.fb.group({
      tooltip: [''],
      selectDomain: ['', Validators.required],
      numberQuestion: ['', [Validators.required, Validators.pattern(this.pattern)]]
    });
  }

  addQuestionDomain() {
    this.listQuestionDomain.push(this.createDetailDomain());
  }

  removeQuestionDomain(index) {
    this.listQuestionDomain.removeAt(index);
    this.validFrm = true;
    this.isDisable = false;
  }


  selectDomain(event, index) {
    let value = this.mapNumberQuestion.get(+event);
    this.listQuestionDomain.controls[index].get('numberQuestion').setValue('');
    this.validFrm = true;
    if (value != undefined) {
      this.listQuestionDomain.controls[index].get('tooltip').setValue(value);
      this.isQuestion = false;
    } else {
      this.isQuestion = true;
      this.listQuestionDomain.controls[index].get('tooltip').setValue(0);
    }
  }

  get getdetailChapter() {
    return this.addDetail.get('detailSelectChapter') as FormArray;
  }

  getQuestionChapter(index): FormGroup {
    const formGroup = this.listQuestionChapter.controls[index] as FormGroup;
    return formGroup;
  }

  createDetailChapter(): FormGroup {
    return this.fb.group({
      tooltip: [''],
      selectChapter: ['', Validators.required],
      numberQuestion: ['', [Validators.required, Validators.pattern(this.pattern)]]
    });
  }

  addQuestionChapter() {
    this.listQuestionChapter.push(this.createDetailChapter());
  }

  removeQuestionChapter(index) {
    this.listQuestionChapter.removeAt(index);
    this.validFrm = true;
    this.isDisable = false;
  }

  removeAllArrayForm(form: FormArray) {
    while (0 !== form.length) {
      form.removeAt(0);
    }
  }


  selectChapter(event, index) {
    let value = this.mapNumberQuestion.get(+event);
    this.listQuestionChapter.controls[index].get('numberQuestion').setValue('');
    this.validFrm = true;
    if (value != undefined) {
      this.listQuestionChapter.controls[index].get('tooltip').setValue(value);
      this.isQuestion = false;
    } else {
      this.isQuestion = true;
      this.listQuestionChapter.controls[index].get('tooltip').setValue(0);
    }
  }

  onChange(selectedValue) {
    this.isType = selectedValue;
    this.listNumberQuestion = [];
    this.mapNumberQuestion.clear();
    this.isQuestion = false;
    this.maxQuestion = false;
    this.errSearch = false;
    this.validFrm = true;
    if (selectedValue == 1) {
      if (this.examSetting.length > 0) {
        if (this.examSetting[0].chapter_id === 0) {
          this.questionService
            .getNumberQuestionOfChapter(this.exam[1])
            .subscribe(res => {
              let list = res;
              list.map(x => {
                this.mapNumberQuestion.set(x[1], x[0]);
              });
            });
          this.clearValidatorsDomain();
          this.addValidatorsChapter();
        } else {
          this.loadExamSetting();
        }
      } else {
        this.questionService
          .getNumberQuestionOfChapter(this.exam[1])
          .subscribe(res => {
            let list = res;
            list.map(x => {
              this.mapNumberQuestion.set(x[1], x[0]);
            });
          });
        this.clearValidatorsDomain();
        this.addValidatorsChapter();
      }
    } else if (selectedValue == 2) {
      if (this.examSetting.length > 0) {
        if (this.examSetting[0].domain_id === 0) {
          this.questionService
            .getNumberQuestionOfDomain(this.exam[1])
            .subscribe(res => {
              this.listNumberQuestion = res;
              this.listNumberQuestion.map(x => {
                this.mapNumberQuestion.set(x[1], x[0]);
              });
            });
          this.clearValidatorsChapter();
          this.addValidatorsDomain();
        } else {
          this.loadExamSetting();
        }
      } else {
        this.questionService
          .getNumberQuestionOfDomain(this.exam[1])
          .subscribe(res => {
            this.listNumberQuestion = res;
            this.listNumberQuestion.map(x => {
              this.mapNumberQuestion.set(x[1], x[0]);
            });
          });
        this.clearValidatorsChapter();
        this.addValidatorsDomain();
      }
    } else {
      if (this.examSetting.length > 0) {
        if (this.examSetting[0].keyword != '')
          this.loadExamSetting();
      }
    }
  }

  addValidatorsDomain() {
    for (let key in this.listQuestionDomain.controls) {
      this.listQuestionDomain.controls[key].get('numberQuestion').setValidators([Validators.required, Validators.pattern(this.pattern)]);
      this.listQuestionDomain.controls[key].get('selectDomain').setValidators([Validators.required]);
    }

  }

  addValidatorsChapter() {
    for (let key in this.listQuestionChapter.controls) {
      this.listQuestionChapter.controls[key].get('numberQuestion').setValidators([Validators.required, Validators.pattern(this.pattern)]);
      this.listQuestionChapter.controls[key].get('selectChapter').setValidators([Validators.required]);
    }
  }

  clearValidatorsDomain() {
    this.numSearch = -1;
    this.addDetail.controls['keyword'].setValue('');
    for (let key in this.listQuestionDomain.controls) {
      this.listQuestionDomain.controls[key].reset();
      this.listQuestionDomain.controls[key].get('tooltip').setValue(0);
      this.listQuestionDomain.controls[key].get('numberQuestion').clearValidators();
      this.listQuestionDomain.controls[key].get('selectDomain').clearValidators();
      this.listQuestionDomain.controls[key].get('numberQuestion').updateValueAndValidity();
      this.listQuestionDomain.controls[key].get('selectDomain').updateValueAndValidity();
    }
  }
  clearValidatorsChapter() {
    this.numSearch = -1;
    this.addDetail.controls['keyword'].setValue('');
    for (let key in this.listQuestionChapter.controls) {
      this.listQuestionChapter.controls[key].reset();
      this.listQuestionChapter.controls[key].get('tooltip').setValue(0);
      this.listQuestionChapter.controls[key].get('numberQuestion').clearValidators();
      this.listQuestionChapter.controls[key].get('numberQuestion').updateValueAndValidity();
      this.listQuestionChapter.controls[key].get('selectChapter').clearValidators();
      this.listQuestionChapter.controls[key].get('selectChapter').updateValueAndValidity();
    }
  }

  validateMax(value, index) {
    let maxQuestion = this.listQuestionDomain.controls[index].get('tooltip').value;
    if (
      this.exam[0] < +value || maxQuestion < +value
    ) {
      this.isDisable = true;
      this.validFrm = true;
      this.maxQuestion = true;
    } else if (this.checkDomain(index)) {
      this.isDisable = true;
      this.validFrm = true;
      this.maxQuestion = true;
    } else if (this.exam[0] == this.countNumQuestion()) {
      this.isDisable = true;
      this.maxQuestion = false;
      this.validFrm = false;
    } else {
      this.isDisable = false;
      this.validFrm = true;
      this.maxQuestion = false;
    }
  }

  validateMaxChapter(value, index) {
    let maxQuestion = this.listQuestionChapter.controls[index].get('tooltip').value;
    if (
      this.exam[0] < +value || maxQuestion < +value
    ) {
      this.isDisable = true;
      this.validFrm = true;
      this.maxQuestion = true;
    } else if (this.checkChapter(index)) {
      this.isDisable = true;
      this.validFrm = true;
      this.maxQuestion = true;
    } else if (this.exam[0] == this.countNumQuestionChapter()) {
      this.isDisable = true;
      this.maxQuestion = false;
      this.validFrm = false;
    } else {
      this.isDisable = false;
      this.validFrm = true;
      this.maxQuestion = false;
    }
  }

  countNumQuestionChapter() {
    let count = 0;
    for (let index = 0; index < this.listQuestionChapter.length; index++) {
      count += +this.listQuestionChapter.controls[index].get('numberQuestion').value;
    }
    return count;
  }

  checkChapter(index) {
    let domainId = +this.listQuestionChapter.controls[index].get('selectChapter').value;
    let maxQuestion = +this.listQuestionChapter.controls[index].get('tooltip').value;
    let num = 0;
    for (let index = 0; index < this.listQuestionChapter.length; index++) {
      if (this.listQuestionChapter.controls[index].get('selectChapter').value == domainId)
        num += +this.listQuestionChapter.controls[index].get('numberQuestion').value;
    }
    if (num > maxQuestion) {
      return true;
    } else if (this.exam[0] < this.countNumQuestionChapter()) {
      return true;
    } else {
      return false;
    }
  }

  countNumQuestion() {
    let count = 0;
    for (let index = 0; index < this.listQuestionDomain.length; index++) {
      count += +this.listQuestionDomain.controls[index].get('numberQuestion').value;
    }
    return count;
  }

  checkDomain(index) {
    let domainId = +this.listQuestionDomain.controls[index].get('selectDomain').value;
    let maxQuestion = +this.listQuestionDomain.controls[index].get('tooltip').value;
    let num = 0;
    for (let index = 0; index < this.listQuestionDomain.length; index++) {
      if (this.listQuestionDomain.controls[index].get('selectDomain').value == domainId)
        num += +this.listQuestionDomain.controls[index].get('numberQuestion').value;
    }
    if (num > maxQuestion) {
      return true;
    } else if (this.exam[0] < this.countNumQuestion()) {
      return true;
    } else {
      return false;
    }
  }

  mess: string;
  search() {
    let key = this.addDetail.controls['keyword'].value;
    if (key != '') {
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
    } else {
      this.errSearch = true;
      this.mess = "Chưa nhập từ khóa!";
      this.validFrm = true;
    }

  }

  onSubmit() {
    if (!this.validFrm) {
      let value = this.addDetail.value;
      let formData = new FormData();
      formData.append('data', JSON.stringify(value));
      formData.append('examId', JSON.stringify(this.examId));
      formData.append('subjectId', JSON.stringify(this.exam[1]));
      this.examService.insertExamRandom(formData).subscribe((res: Response) => {
        //   this.router.navigate(['/cms/exam/details', this.examId]);
        this.loadExamSetting();
        this.notifier.notify('success', 'Update exam success!');
      })
    }
  }

}
