import { Component, OnInit } from '@angular/core';
import { TraineeAssignment } from 'src/app/model/trainee_assignment/traineeassignment';
import { TraineeAssignmentService } from 'src/app/service/trainee_assignment/traineeassignment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Constant } from 'src/app/common/constant';
import { concatMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/service/login/user.service';
// import { chapter } from 'src/app/model/chapter/chapter';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
@Component({
  selector: 'app-trainee-assignments',
  templateUrl: './trainee-assignments.component.html',
  styleUrls: ['./trainee-assignments.component.scss']
})
export class TraineeAssignmentsComponent implements OnInit {
  data: any;
  selectedType: any;
  traineeAssignment: TraineeAssignment[] = [];
  _chapters: [];
  traineeAss: TraineeAssignment;
  updateForm: FormGroup;
  baseURL = '';
  config: any;
  perPage = 5;
  _searchKey = '';
  keyall = 'Hiện thị tất cả assignment của lớp';
  listTrainee: Object[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private traineeAssignmentService: TraineeAssignmentService,
    private router: Router,
    private titleService: Title,
    private fb: FormBuilder,
    private us: UserService,
    private chapterService: ChapterService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Testonline System - TraineeAssignment');
    // get id form path cms/traineeassignment/:id
    this.data = this.activatedRoute.snapshot.params['id'];
    this.traineeAssignmentService.getTraineeAssignmentsByClassId(this.data).subscribe(
      res => {
        this.traineeAssignment = JSON.parse(JSON.stringify(res));
      }
    );
    this.chapterService.listChapter().subscribe(
      (res:any) => {
        // let _arr = [];
        // res.forEach((r: any) => {
        //   _arr.push({
        //     id: r[0],
        //     name: r[r.length - 1]
        //   })
        // })
        // this._chapters = JSON.parse(JSON.stringify(res));
        this._chapters = res;
      }
    )
    this.updateForm = this.fb.group({
      id: [''],
      fullName: [''],
      timeSubmit: [''],
      trainerId: [''],
      result: ['',[
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern(/^\d+$/)
      ]],
      resultDetail: ['', [Validators.required,Validators.maxLength(50),
        Validators.pattern('.*\\S.*[a-zA-z0-9 ]')]],
      timeEval: [''],
      assignment: [''],
      evaluator: ['']
    });

  };

  onSubmitUpdate() {

    const { valid, value } = this.updateForm;
    if (valid) {
      const data = value;
      data.evaluator = this.us.userLogin.fullname;
      const formdata = new FormData();
      formdata.append('traineeAssignment', JSON.stringify(data));
      this.traineeAssignmentService
        .updateTrainee(formdata).pipe(concatMap(_ => this.traineeAssignmentService
          .getTraineeAssignmentsByClassId(this.activatedRoute.snapshot.params['id'])))
        .subscribe(
          res => {
            this.traineeAssignment = res;
          }
        );
    }
  }
  onClickUpdate(o: TraineeAssignment) {
    this.updateForm.patchValue(o);
  }
  onChange(event) {
    this.perPage = event.target.value;
  }

  filterByType(event) {
    this._searchKey = event.target.value.trim();
    if (this._searchKey !== '') {
      const body = {
        searchKey: this._searchKey,
        id: this.activatedRoute.snapshot.params['id']
      };
      const formData = new FormData();
      formData.append('searchKey', JSON.stringify(body));
      this.traineeAssignmentService.getListAssignmentBySeach(formData).subscribe(
        res => {
          this.traineeAssignment = res;
        }
      );
    } if(event.target.value.trim() == this.keyall){
    this.traineeAssignmentService.getTraineeAssignmentsByClassId(this.activatedRoute.snapshot.params['id']).subscribe(
      res => {
        this.traineeAssignment = JSON.parse(JSON.stringify(res));
        }
      );
    }
  }
  downloadAssigment(id, file) {

    this.traineeAssignmentService.downloadAssigment(id).subscribe(
      response => {

        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.setAttribute('download', file);
        document.body.appendChild(downloadLink);
        downloadLink.click();

      }
    );
  }

}
