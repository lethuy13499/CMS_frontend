import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExamService } from 'src/app/service/exam/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { concatMap, tap, switchMap } from 'rxjs/operators';
import { of, iif, forkJoin } from 'rxjs';
import { DomainService } from 'src/app/service/domain/domain.service';
import { UploadfileServiceService } from 'src/app/service/questionservice/uploadfile-service.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Popup } from 'ng2-opd-popup';
import { Title } from '@angular/platform-browser';
import { Exam } from 'src/app/model/exam/exam';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-selected-question',
  templateUrl: './selected-question.component.html',
  styleUrls: ['./selected-question.component.scss']
})
export class SelectedQuestionComponent implements OnInit {
  createType: number;
  type: string;
  numberQuestionOfExam: number;
  timewarning: boolean;
  data = [];
  listChapter = [];
  listDomain = [];
  time = 0;
  numberQuestion = 0;
  listQuestion = [];
  idSubject: number;
  tempList = [];
  idExam: number;
  exam: Exam;
  isShowConfirm: boolean;
  chapterId: any;
  todo = [];
  done = [];
  listSelected = [];
  key = '';
  isShowEditQuestion: boolean;
  doaminId: any;
  listIdInit: number[];
  addDetail: FormGroup;
  isUpdate: boolean;
  timeMax: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private router: Router,
    private examService: ExamService,
    private questionService: UploadfileServiceService,
    private domainService: DomainService,
    private chapterService: ChapterService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.timewarning = false;
    this.createType = 1;
    this.isUpdate = true;
    this.addDetail = this.fb.group({
      type: [''],
      timeWarning: [''],
      numberQuestion: ['', []],
      selectChapter: ['', []],
      selectDomain: ['', []],
    });
    this.titleService.setTitle('Testonline System - Exam detail');
    this.tempList.push(0);
    this.isShowEditQuestion = false;
    this.activeRoute.parent.params
      .subscribe(paramsParent => {
        this.idExam = paramsParent['id']
      });
    this.examService.getNumAndSubjectById(this.idExam).subscribe(res => {
      this.idSubject = res[1];
      this.questionService
        .getQuestionOfExam(this.idExam)
        .pipe(
          tap(output => {
            this.done = output;
            this.listIdInit = this.done.map(x => x.id);
            if (this.listIdInit.length === 0) {
              this.listIdInit.push(0);
            }
            if (this.done.length !== 0) {
              this.time = this.done.map(x => x.time).reduce((a, b) => a + b);
              this.numberQuestion = this.done.length;
            }
          }),
          switchMap(output =>
            this.questionService.getQuestionOfSubject(
              this.idSubject,
              this.listIdInit
            )
          )
        )
        .subscribe(res => {
          this.todo = res;
          this.listQuestion = res;
        });
      this.examService
        .getExamById(this.idExam)
        .pipe(
          tap(output => {
            this.exam = output;
            this.numberQuestionOfExam = this.exam['question_num'];
            this.timeMax = this.exam['time'] * 60;
          }),
          switchMap(output2 =>
            this.questionService.getQuestionOfSubject(
              this.idSubject,
              this.tempList
            )
          )
        )
        .subscribe();
      const dataChapter = this.chapterService.getLisChapterBySubjectAndParent(
        this.idSubject
      );
      const chapter = dataChapter.pipe(concatMap(val => of(val)));
      const dataDomain = this.domainService.getLisDomainBySubject(this.idSubject);
      const domain = dataDomain.pipe(concatMap(val => of(val)));
      chapter.subscribe(res => {
        this.listChapter = res;
        this.listChapter.unshift('');
      });
      domain.subscribe(res => {
        this.listDomain = res;
        this.listDomain.unshift('');
      });
    })
    this.listIdInit = this.done.map(x => x.id);

  }
  drop(event: CdkDragDrop<string[]>) {
    // tslint:disable-next-line:prefer-const
    let oldDone = this.done.slice();
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      if (this.done.length <= this.exam['question_num']) {
        if (this.done.length > oldDone.length) {
          this.time += +this.done[event.currentIndex]['time'];
          this.numberQuestion += 1;
          if (this.time > this.exam['time'] * 60) {
            this.timewarning = true;
          } else {
            this.timewarning = false;
          }
        } else {
          if (this.time > this.exam['time'] * 60) {
            this.timewarning = true;
          } else {
            this.timewarning = false;
          }
          this.time -= +oldDone[event.previousIndex]['time'];
          this.numberQuestion -= 1;
        }
      } else {
        this.todo.push(this.done[event.currentIndex]);
        this.done.splice(event.currentIndex, 1);
      }
    }
  }
  onChangeDomain(value) {
    this.doaminId = value;
  }
  onChangeChapter(value) {
    this.chapterId = value;
  }

  getListRestQuestion() {
    this.listSelected = this.done.map(x => x.id);
    if (this.chapterId === undefined || isNaN(this.chapterId)) {
      this.chapterId = 0;
    }
    if (this.doaminId === undefined || isNaN(this.doaminId)) {
      this.doaminId = 0;
    }
    if (this.key === undefined) {
      this.key = '';
    }
    if (this.key.length === 0) {
      this.key = '';
    }
    if (this.listSelected.length === 0) {
      this.listSelected.push(0);
    }
    this.questionService
      .getListRestQuestion(
        +this.chapterId,
        +this.doaminId,
        this.listSelected,
        this.key,
        this.idSubject
      )
      .subscribe(res => {
        this.todo = res;
      });
  }
  
  updateExamDetail() {
    if (this.done.length < this.exam['question_num']) {
      this.isUpdate = false;
    } else {
      this.listSelected = [];
      this.listSelected = this.done.map(x => x.id);
      this.isUpdate = true;
      if (this.createType === 0) {
        const data = new FormData();
        data.append('listRandom', JSON.stringify(this.addDetail.value));
        this.examService
          .updateExamDetail(
            this.listSelected,
            this.exam['id'],
            this.createType,
            data
          )
          .subscribe(res => {
            if (res['response'] === 'success') {
              //this.router.navigate(['cms/exam']);
              this.notifier.notify('success', 'Update exam success!');
            }
          });
      } else {
        this.examService
          .updateExamDetail(
            this.listSelected,
            this.exam['id'],
            this.createType,
            null
          )
          .subscribe(res => {
            if (res['response'] === 'success') {
              this.notifier.notify('success', 'Update exam success!');
            //  this.router.navigate(['cms/exam']);
            }
          });
      }
    }
  }

}
