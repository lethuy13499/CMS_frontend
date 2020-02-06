import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { subject } from 'src/app/model/subject/subject';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Popup } from 'ng2-opd-popup';
import { Subscription } from 'rxjs';
import {Exam} from 'src/app/model/exam/exam';
import {chapter} from 'src/app/model/chapter/chapter';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Title } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { concatMap } from 'rxjs/operators';

export function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
@Component({
  selector: 'app-chapter-lesson-details',
  templateUrl: './chapter-lesson-details.component.html',
  styleUrls: ['./chapter-lesson-details.component.scss']
})
export class ChapterLessonDetailsComponent implements OnInit {

  subject: subject;
  insertChapter: FormGroup;
  updateChapter: FormGroup;
  exam: Exam;
  chapter: chapter;
  listUpdate: chapter[] = [];
  list: chapter[] = [];
  _chapterlist: [];
  public name: string;
  public message: string;
  public id: number;
  public checkAdd: boolean;
  public subcrition: Subscription;
  public subjectId: string;
  selectedType = '^0$|^1$';
  chapterId:number;
  searchKey = '';
  errChapter = '';
  lsType: 0;
  chapterData: any;
  listExam: Object[] = [];
  subId: number;
  perPage = 5;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '5rem',
    placeholder: 'Nhập nội dung...',
    translate: 'no',
    customClasses: [
      {
        name: 'quote',
        class: 'quote'
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1'
      }
    ]
  };
  @ViewChild('popupDelete') popupDelete: Popup;

  constructor(
    private subjectService: SubjectService,
    private activatedRoter: ActivatedRoute,
    private fb: FormBuilder,
    private notifierService: NotifierService,
    private chapterService: ChapterService,
    private titleService: Title,
    private examService: ExamService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
  ) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.subcrition) {
      this.subcrition.unsubscribe();
    }
  }

  ngOnInit() {
    this.getAll();

    this.titleService.setTitle('Testonline System - Chapter');
    this.insertChapter = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
          validatorEmptyInput
        ]
      ],
      assignment: [
        '',
        [
          Validators.maxLength(10000),
        ]
      ],
      contentType: ['0'],

      parent_name: [''],
      subject_name: ['0'],
      exam_name: ['']
    });

    this.updateChapter = this.fb.group({
      id: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
          validatorEmptyInput
        ]
      ],
      assignment: [
        '',
        [
          Validators.maxLength(10000),
        ]
      ],
      contentType: ['0'],

      parent_name: [''],
      subject_name: ['0'],
      exam_name: ['',  Validators.required,]
    });

    // details chapter
    const id = this.activatedRoter.snapshot.params['id'];
    this.chapterService.getChapterByID(+id).subscribe(res => {this.chapter = res;
    });
     // details chapter
     this.examService.getListExam(this.searchKey, this.selectedType).subscribe(res => {
      this.listExam = res;
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
   }

   trackByFn(index, item) {
    return item.id;
  }

  onChanges(event) {
    this.perPage = event.target.value;
  }

  checkSpaceName(event) {
    const val = event.target.value.trim();
    this.insertChapter.get('name').setValue(val.replace(/\s\s+/g, ' '));
  }

  onChange(selectedValue) {
    this.lsType = selectedValue;
    if (selectedValue === 1) {
      this.insertChapter.controls['assignment'].setValidators([Validators.required]);
    } else {
      this.insertChapter.controls['assignment'].setValue('');
      this.insertChapter.controls['assignment'].clearValidators();
      this.insertChapter.controls['assignment'].updateValueAndValidity();
    }
  }

  onSubmit() {
  const { valid, value } = this.insertChapter;
    if (valid) {
      const data = value;
      data.parent_name = this.activatedRoter.snapshot.params['id'];
      const formdata = new FormData();
      formdata.append('chapter', JSON.stringify(data));
      this.chapterService
        .createChapter3(formdata)
        .pipe(concatMap(_ => this.chapterService.findByParentId(this.activatedRoter.snapshot.params['id'])))
        .subscribe(
          (res: any) => {
            this._chapterlist = res;
          },
          error => {
            this.errChapter = 'Không được trùng  tên ';
          }
        );
    }
  }
   onClickUpdate(chap1: chapter) {
    this.updateChapter.patchValue(chap1);
  }

  onSubmitUpdate(){
    const { valid, value } = this.updateChapter;
    if (valid) {
      const data = value;
      data.parent_name = this.activatedRoter.snapshot.params['id'];
      const formdata = new FormData();
      formdata.append('chapter', JSON.stringify(data));
      this.chapterService
        .updateChapter3(formdata)
        .pipe(concatMap(_ => this.chapterService.findByParentId(this.activatedRoter.snapshot.params['id'])))
        .subscribe(
          (res: any) => {
            this._chapterlist = res;
          },
          error => {
            this.errChapter = 'Không được trùng  tên ';
          }
        );
    }
  }
   getAll() {
  this.chapterService.findByParentId(this.activatedRoter.snapshot.params['id'])
  .subscribe
  ((res: any) => {
    this._chapterlist = res;
     });

}

onClickDelete(chap1: chapter) {
  this.chapter = chap1;
  this.popupDelete.options = {
    header: 'Xóa',
    color: '#C82333',
    confirmBtnClass: 'btn btn-danger',
    confirmBtnContent: 'Xóa',
    cancleBtnClass: 'btn btn-default',
    cancleBtnContent: 'Hủy',
    widthProsentage: 30,
    animation: 'bounceIn'
  };
  this.popupDelete.show(this.popupDelete.options);
}
confirmDeleteClick() {
    this.chapterService
    .deleteChapter2(this.chapter.id)
    .pipe(concatMap(_ => this.chapterService.findByParentId(this.activatedRoter.snapshot.params['id'])))
    .subscribe(
      (res: any) => {
        this._chapterlist = res;
      }
    );
  this.popupDelete.hide();
}


 }
