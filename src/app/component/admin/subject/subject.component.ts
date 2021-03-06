import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { subject } from 'src/app/model/subject/subject';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { concatMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';
import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit , OnDestroy{
  listSubject: subject[] = [];
  insertForm: FormGroup;
  updateForm: FormGroup;
  subject: subject;
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  errSubject: string;
  perPage = 5;
  keySearch = '';
  public subcrition: Subscription;
  public subjectId: number;
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;
  constructor(
    private subjectService: SubjectService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu,
    private menuFilter: MenuFilterService,
    private notifier:NotifierService
  ) {
  }
  ngOnDestroy() {
    if (this.subcrition) {
      this.subcrition.unsubscribe();
    }
  }
  async ngOnInit()
  {
    this.getAll();
    this.titleService.setTitle('Testonline System - Subject');
    this.insertForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(2),
          // tslint:disable-next-line:max-line-length
          Validators.pattern('^[a-zA-Z0-9.\-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$')
        ]
      ]
    });
    this.updateForm = this.fb.group({
      id: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          // tslint:disable-next-line:max-line-length
          Validators.pattern('^[a-zA-Z0-9.\-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$')
        ]
      ]
    });
    let menuSuccess = await this.menuFilter.checkMenu();
    if (menuSuccess === 1) {
    this.subjectService
      .getListSubject()
      .subscribe(res => (this.listSubject = res));

    this.errSubject = '';
  }
}
  onClickAddNew() {
    this.insertForm.reset();
    this.errSubject = '';
    this.showTable = false;
    this.showInsertForm = true;
    this.showUpdateForm = false;
  }
  onClickCloseForm() {
    this.showTable = true;
    this.showInsertForm = false;
    this.showUpdateForm = false;
  }
  onSubmitInsert() {
    const { valid, value } = this.insertForm;
    if (valid) {
      const sub = value;
      const formdata = new FormData();
      formdata.append('subject', JSON.stringify(sub));
      this.subcrition=this.subjectService
        .createSubject(formdata).subscribe((data:Response)=>{
          this.notifier.notify('success', "Thêm mới thành công", '');
          this.getAll();
          this.insertForm.reset();
        })           
    }
  }
  getAll(){
    this.subjectService.getListSubject().subscribe((subjects:subject[])=>{
       this.listSubject=subjects;
    })
  }
  onClickDelete(id: number) {
    this.subjectId = id;
    
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
    this.subjectService
      .deleteSubject(this.subjectId).subscribe((res:Response)=>{
        this.notifier.notify('success', res.toString(), '');
        this.getAll();
      })
     
    this.popupDelete.hide();
  }
  onClickUpdate(sub: subject) {
    this.updateForm.patchValue(sub);
    this.subject = sub;
    this.showUpdateForm = true;
    this.showTable = false;
    this.showInsertForm = false;
    this.errSubject = '';
  }
  onSubmitUpdate() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const data = value;

      const formdata = new FormData();
      formdata.append('subject', JSON.stringify(data));
      this.subjectService
        .updateSubject(formdata)
        .pipe(concatMap(_ => this.subjectService.getListSubject()))
        .subscribe(
          res => {
            this.listSubject = res;
            this.showUpdateForm = false;
            this.showTable = true;
          },
          err => {
            this.errSubject = 'Môn học đã tồn tại. vui lòng nhập lại!';
          }
        );
    }
  }
  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }
  search(event) {
    this.keySearch = event.target.value.trim();
    if (this.keySearch.trim() !== '') {
      const body = {
        key: this.keySearch
      };
      this.subjectService
        .onSearchSubject(this.keySearch)
        .pipe(
          concatMap(_ => this.subjectService.onSearchSubject(this.keySearch.trim()))
        )
        .subscribe(
          res => {
            this.listSubject = res;
          },
          error => {
            this.router.navigate(['/error']);
          }
        );
    } else {
      this.getAll();
      // this.subjectService
      //   .getListSubject()
      //   .subscribe(res => (this.listSubject = res));
    }
  }
  // sort() {
  //   if (this.listSubject !== null) {
  //     const body = {
  //       name: name
  //     };
  //     this.subjectService
  //       .sortSubjectByName()
  //       .pipe(concatMap(_ => this.subjectService.sortSubjectByName()))
  //       .subscribe(
  //         res => {
  //           this.listSubject = res;
  //         }
  //       );
  //   }
  // }
  checkSpaceName(event) {
    const val = event.target.value.trim();
    this.insertForm.get('name').setValue(val.replace(/\s\s+/g, ' '));
  }

  checkSpaceNameupdate(event) {
    const val = event.target.value.trim();
    this.updateForm.get('name').setValue(val.replace(/\s\s+/g, ' '));
  }
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
}
