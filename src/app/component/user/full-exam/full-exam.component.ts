 import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Constant } from 'src/app/common/constant';
import { MatDialog } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { InformationPopupComponent } from '../home/information-popup/information-popup.component';

@Component({
  selector: 'app-full-exam',
  templateUrl: './full-exam.component.html',
  styleUrls: ['./full-exam.component.scss']
})
export class FullExamComponent implements OnInit {
  exams: Object[] = [];
  entryTest: Object[] = [];
  examOften: Object[] = [];
  perPage: number;
  baseURL = '';
  constructor(
    private examService: ExamService,
    private router: Router,
    private titleService: Title,
    public dialog: MatDialog,
    private notifierService: NotifierService,
  ) { }

  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    this.titleService.setTitle('Testonline System - Full test');
    this.perPage=12;
    this.examService.getExamComingSoon(JSON.parse(localStorage.getItem('item')).id).subscribe(exam_often=>(this.examOften=exam_often));
  }
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
  clickRegis(exam) {
    const dialogRef = this.dialog.open(InformationPopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const examResult = {
          email: '',
          exam_id: exam.id,
          code: result
        };
        const formData = new FormData();
        formData.append('examUser', JSON.stringify(examResult));
        this.examService.getStartExam(formData).subscribe(
          res => {
            this.router.navigate([
              '/hometotal/testprocess',
              {
                param1: exam.id,
                param2: res,
                param3: exam.name,
                param4: exam.title
              }
            ]);
          },
          error => {

            this.notifierService.notify('error', error.error.message, '');
          }
        );
      }
    });
  }
}
