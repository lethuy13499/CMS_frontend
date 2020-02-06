import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constant } from 'src/app/common/constant';
import { Popup } from 'ng2-opd-popup';
import { Class } from 'src/app/model/class/class';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/service/class/class.service';
import { error } from 'util';
import { concatMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { ProductService } from 'src/app/service/product/product.service';
import { validatorEmptyInput } from '../../user/user.component';

// import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-class',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  listClass: [];
  index = 1;
  perPage = 5;
  user = [];
  updateForm: FormGroup;
  dropdownSettingUser = {};
  dropdownSettingManage = {};
  deleteClassId: number;
  name: String;

  changeStatusClassId: number;
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupChangeStatus') popupChangeStatus: Popup;

  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  product = [];

  manager_after = [];
  manager_final = [];
  trainner_after = [];
  trainner_final: string;


  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private userservice: UserserviceService,
    private classService: ClassService,
    private productservice: ProductService) { }


  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(250), validatorEmptyInput]
      ],
      date: this.fb.group(
        {
          start_date: ['', [Validators.required]],
          end_date: ['', [Validators.required]]
        }
      ),
      status: ['', [Validators.required]],
      trainner: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      product: ['', [Validators.required]],
      id: [''],
      trainner_id: [''],
      manager_id: ['']
    });
    this.classService.getAllClass().subscribe(res => {
      this.listClass = res;
    });
    this.dropdownSettingUser = {
      singleSelection: false,
      idField: 'id',
      textField: 'fullname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search',
      allowSearchFilter: true
    };
    this.dropdownSettingManage = {
      singleSelection: true,
      idField: 'id',
      textField: 'fullname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search',
      allowSearchFilter: true
    };


  }

  searchClassByName(event) {
    this.name = event.target.value.trim();
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    this.classService.searchClassByName(this.name).subscribe(
      res => {
        this.listClass = res;
      }
    )
  }

  sortClass(index: number, collumn: String) {
    
    this.index = index + 1;
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    this.classService.sortClass(this.index, collumn, this.name).subscribe(
      res => {

        this.listClass = res;
      }
    )
  }

  onChange(event) {
    this.perPage = event.target.value;
  }

  onClickDelete(classid) {
    this.deleteClassId = classid;
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

  onClickChangeStatus(event, classid) {
    event.preventDefault();
    this.changeStatusClassId = classid;
    this.popupChangeStatus.options = {
      header: 'Change status',
      color: '#C82333',
      confirmBtnClass: 'btn btn-danger',
      confirmBtnContent: 'Change',
      cancleBtnClass: 'btn btn-default',
      cancleBtnContent: 'Hủy',
      widthProsentage: 30,
      animation: 'bounceIn'
    };
    this.popupChangeStatus.show(this.popupChangeStatus.options);
  }
  confirmChangeStatus() {
    this.classService.changeClassStatus(this.changeStatusClassId).pipe(
      concatMap(_ => this.classService.getAllClass())
    ).subscribe(
      res => {
        this.listClass = res;
      },
      error => {
        this.router.navigate(['/cms/error']);
      }
    )

    this.popupChangeStatus.hide();
  }

  confirmDeleteClick() {

    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    this.classService.deleteClassById(this.deleteClassId).subscribe(
      res => {
        this.listClass = res;
      },
      error => {
        this.router.navigate(['/cms/error']);
      }
    )

    this.popupDelete.hide();
  }
  onClickAddNew() {
    this.showTable = false;
    this.showInsertForm = true;
    this.productservice.getlistProduct().subscribe(res => {
      this.product = res;
    })
    this.userservice.getUserList().subscribe(res => {
      this.user = res;

    })

  }
  onClickCloseForm() {
    this.showTable = true;
    this.showInsertForm = false;

  }
  onSubmitCreate() {
    
    this.manager_after = this.updateForm.get('manager').value;
    this.manager_final = this.manager_after[0].id;
    this.updateForm.get('manager_id').setValue(this.manager_final);
    //  
    let a = this.updateForm.get('trainner').value;
    for (let i = 0; i < a.length; i++) {
      this.trainner_after.push(a[i].id);
    }
    this.trainner_final = this.trainner_after.join(',');
    this.updateForm.get('trainner_id').setValue(this.trainner_final)
    let Form = JSON.stringify(this.updateForm.value);
    const data = new FormData();
    data.append('formData', JSON.stringify(this.updateForm.value));
    this.classService.createClass(data).subscribe(res => {
      
      if (res = 'true') {
        this.router.navigate(['/cms/class']);
        this.updateForm.reset();
        this.showTable = true;
        this.showInsertForm = false;
      }
      else {
        this.router.navigate(['/cms/error']);
      }
    })
  }

}
