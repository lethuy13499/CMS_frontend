import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExamService } from 'src/app/service/exam/exam.service';
import { DatatranferService } from 'src/app/service/datatranfer/datatranfer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AngularEditorConfig } from '@kolkov/angular-editor'

@Component({
  selector: 'app-exam-description',
  templateUrl: './exam-description.component.html',
  styleUrls: ['./exam-description.component.scss']
})
export class ExamDescriptionComponent implements OnInit {

  briefForm: FormGroup;
  examid: number;
  examById: any;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter content here...',
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
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private examService: ExamService,
    private notifier: NotifierService,
    private tranfer: DatatranferService,
    private router: Router,
  ) { }



  ngOnInit() {

    this.route.parent.params
      .subscribe(paramsParent => {
        // Get parent route param
        this.examid = paramsParent['id']
        // this.passExamId(this.examid)
      });
    if (this.examid != null) {
      this.examService.getExamById(this.examid).subscribe(
        res => {
          this.examById = res;
          
          this.briefForm.patchValue({
            examid: this.examById.id,
            title: this.examById.title,
            description: this.examById.decription,


          });
        }
      )

    }

    this.briefForm = this.fb.group({
      title: [''],
      description: [''],
      examid: ['']
    })
    // this.tranfer.currentMessage.subscribe(par => {
    //   if (par.key == 'examid') {
    //     this.examid = par.value;
    //     this.briefForm.get('examid').setValue(this.examid);
    //   }
    // })

  }

  passExamId(id: number) {
    // let pass = {
    //   key: key,
    //   value: value
    // }
    this.tranfer.passExamId(id);
  }

  updateDescription() {
    const { valid, value } = this.briefForm;
    if (valid) {
      const dom = value;
      const formdata = new FormData();
      formdata.append('description', JSON.stringify(dom));
      this.examService.updateExamDescription(formdata).subscribe(
        res => {
          // this.router.navigate(['/cms/exam/details/' + this.examid]);
          this.notifier.notify('success', 'Update exam description success!');
          location.reload(true);
        }
      );
    }

  }

}
