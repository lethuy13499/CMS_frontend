import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { Title } from '@angular/platform-browser';
import { subject } from 'src/app/model/subject/subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Router, ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { Exam } from 'src/app/model/exam/exam';

@Component({
  selector: 'app-exam-demo',
  templateUrl: './exam-demo.component.html',
  styleUrls: ['./exam-demo.component.scss']
})
export class ExamDemoComponent implements OnInit {
  data: any;
  _listSubject: subject[] = [];
  _subject: subject;
  _listExamNew: Object[] = [];
  fromthongtin: FormGroup;
  _searchKey: any;
  _subject_id: any;
  _subject_id_2: any;
  _listExam: Object[] = [];
  isSu: boolean;
  disable = false;
  constructor(
    private subjectService: SubjectService,
    private titleService: Title,
    private fb: FormBuilder,
    private examService: ExamService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Testonline System - Exam Demo');
    this.fromthongtin = this.fb.group({
      combobox: ['', Validators.required],
      exam_id: [''],
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required,
      Validators.email,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
      Validators.maxLength(50)]],
      mobile: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      school: [''],
    });
    this.data = this.activatedRoute.snapshot.params['param1'];
    this.subjectService
      .getListSubject()
      .subscribe(res => {
        this._listSubject = res;

        }
        );
        if (this.data != null) {
      this.fromthongtin.get('exam_id').setValue(this.data);
      this.examService.getOneSubjectByIdExam(this.data).subscribe((res: any) => {
        this._subject = res;
        this.fromthongtin.get('combobox').setValue(res['id']);
        this.disable = true;
      }

      )
    }

  }


  filterByType(event) {
    this._searchKey = event.target.value.trim();

    if (this._searchKey !== '') {
      this.examService.ranDomOneExamBySubject(this._searchKey).subscribe(
        res => {
          this.fromthongtin.get('exam_id').setValue(res[0][0]);
          // this._listExam = res;
          // this._subject_id = this._listExam[0][0];
          // //
          // //
          if(res[0][5] != 0){
            this.isSu= false;
          }
          else {
            this.isSu = true;
          }
        }
      );
    }
  }

  onSubmitAdd() {
    const { valid, value } = this.fromthongtin;
    if (valid) {
      const data = value;
      // data.exam_id = this._subject_id;
      const formdata = new FormData();
      formdata.append('examDemo', JSON.stringify(data));
      this.examService
        .addExamDemo(formdata)
        .subscribe(
          res => {
            this.router.navigate([
              '/hometotal/testfreedom',
              {
                param1: res['exam']['id'],
                param2: res['id']
              }
            ]);
          }
        );
    }
  }
}
