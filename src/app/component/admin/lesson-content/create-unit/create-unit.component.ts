import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Unit } from 'src/app/model/unit/unit';
import { UnitService } from 'src/app/service/unit/unit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';


export function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.scss']
})
export class CreateUnitComponent implements OnInit , AfterViewChecked {

  insertUnit: FormGroup;
  lsType: 0;
  subjectId: number;
  chapterId: number;
  listExam: Object[] = [];
  fileURL: any;
  public messageVideo: string;
  public filePdf: any = File;
  public url = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((?:\w|-){11})(?:&list=(\S+))?$/;
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
    private unitService: UnitService,
    private router: Router,
    private activatedRounte: ActivatedRoute
  ) { }


  ngOnInit() {

    this.insertUnit = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
          validatorEmptyInput
        ]
      ],
      description: [
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
      medialink: [],
      document: [],
    })
    this.loadListExam();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  onChange(selectedValue) {
    this.lsType = selectedValue;
    if (selectedValue == 2) {
      this.insertUnit.controls['medialink'].setValidators([Validators.required, Validators.pattern(this.url), validatorEmptyInput])
      this.clearValidatorsExam();
      this.clearValidatorsDocument();
    } else if (selectedValue == 1) {
      this.insertUnit.controls['document'].setValidators([Validators.required, Validators.pattern(/(\.pdf)$/i)]);
      this.clearValidatorsExam();
      this.clearValidatorsLink();
    } else if (selectedValue == 3) {
      this.insertUnit.controls['exam'].setValidators([Validators.required]);
      this.clearValidatorsDocument();
      this.clearValidatorsLink();
    }else{
      this.clearValidatorsDocument();
      this.clearValidatorsExam();
      this.clearValidatorsLink();
    }
  }

  clearValidatorsExam(){
    this.insertUnit.controls['exam'].setValue(null);
    this.insertUnit.controls['exam'].clearValidators();
    this.insertUnit.controls['exam'].updateValueAndValidity();
  }
  clearValidatorsDocument(){
    this.insertUnit.controls['document'].setValue(null);
    this.insertUnit.controls['document'].clearValidators();
    this.insertUnit.controls['document'].updateValueAndValidity();
  }
  clearValidatorsLink(){
    this.insertUnit.controls['medialink'].setValue(null);
    this.insertUnit.controls['medialink'].clearValidators();
    this.insertUnit.controls['medialink'].updateValueAndValidity();
  }


  onSelectPdf(files) {
    this.filePdf = files[0];
  }


  onSubmit() {
    //this.lessonData = JSON.parse(localStorage.getItem('create-unit'));
    const value = this.insertUnit.value;
    this.activatedRounte.paramMap.subscribe( params => {
      this.subjectId = +params.get('subjectId');
      this.chapterId = +params.get('chapterId');
    });
    const unit: Unit = {
      ...value,
      chapterId: this.chapterId,
      
    }
    const formData = new FormData();
    formData.append('unit', JSON.stringify(unit));
    formData.append('fileDocument', this.filePdf);
    this.unitService.createUnit(formData).subscribe(() => {
      this.router.navigate(['/cms/subject-outline/' + this.subjectId]);
    })
  }
  
  close(){
    this.activatedRounte.paramMap.subscribe( params => {
      const subjectId = +params.get('subjectId');
      this.router.navigate(['/cms/subject-outline/' + subjectId ]);
    });
   
  }

  loadListExam() {
    this.activatedRounte.paramMap.subscribe( params => {
      const subjectId = +params.get('subjectId');
      this.examService
      .getListExamBySubjectId(+subjectId)
      .subscribe(res => {
        this.listExam = res;
      });
    });
  }
}
