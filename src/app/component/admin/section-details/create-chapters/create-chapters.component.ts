import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ExamService } from 'src/app/service/exam/exam.service';
import {chapter} from 'src/app/model/chapter/chapter';
import { Router } from '@angular/router';
import { ChapterService } from 'src/app/service/chapter/chapter.service';


export function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
@Component({
  selector: 'app-create-chapters',
  templateUrl: './create-chapters.component.html',
  styleUrls: ['./create-chapters.component.scss']
})
export class CreateChaptersComponent implements OnInit {
  insertChapter: FormGroup;
  lsType: 0;
  chapterData: any;
  listExam: Object[] = [];
  subId: number;
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


  constructor(
    private cdRef:ChangeDetectorRef,
    private fb: FormBuilder,
    private examService: ExamService,
    private chapterService: ChapterService,
    private router: Router,
  ) { }

  ngOnInit() {
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
          Validators.required,
          Validators.maxLength(10000),
          Validators.minLength(5),
          validatorEmptyInput
        ]
      ],
      contentType: ['0'],
      exam: [],
      subject_name: ['']

    });



  }

   ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  onChange(selectedValue) {
    this.lsType = selectedValue;
    if (selectedValue === 1) {
      this.insertChapter.controls['assignment'].setValidators([Validators.required]);
    } else if (selectedValue === 2) {
      this.insertChapter.controls['exam'].setValidators([Validators.required]);
    }
    else if(selectedValue === 0){
      this.insertChapter.controls['standard lesson'].setValidators([Validators.required]);
    }
    else {

      this.insertChapter.controls['assignment'].setValue("");
      this.insertChapter.controls['assignment'].clearValidators();
      this.insertChapter.controls['assignment'].updateValueAndValidity();
      this.insertChapter.controls['exam'].setValue("");
      this.insertChapter.controls['exam'].clearValidators();
      this.insertChapter.controls['exam'].updateValueAndValidity();
    }
  }



  onSubmit() {

    const value = this.insertChapter.value;
    const chap: chapter = {
      ...value,
   }

    if(chap.subject_name == null){
      chap.subject_name = '0';
    }

    const formData = new FormData();
    formData.append('chapter', JSON.stringify(chap));

    this.chapterService.createChapter2(formData).subscribe(() => {
      this.router.navigate(['/cms/subject-outline']);
    })

  }

  close(){
    this.router.navigate(['/cms/subject-outline']);
  }



    // loadListExam() {
    //       this.examService.getListExamBySubjectId(this.chapterData.subjectId)
    //       .subscribe(res => {
    //         this.listExam = res;
    //       }
    //       );

    // }
  }


