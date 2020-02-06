import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { User } from 'src/app/model/user/users';
import { UserService } from 'src/app/service/login/user.service';
import { Title } from '@angular/platform-browser';
import { validateDOB } from '../../user/edit-profile/edit-profile.component';
import { Roles } from 'src/app/model/role/Roles';
import { RoleService } from 'src/app/service/role/role.service';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { Constant } from 'src/app/common/constant';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';
import { NotifierService } from 'angular-notifier';

export function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
function comparePassword(c: AbstractControl): ValidationErrors | null {
  const value = c.value;
  const { password, confirmPassword } = value;
  if (password !== confirmPassword) {
    return {
      passwordNotMatch: true
    };
  }
  return null;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  listUser: User[] = [];
  insertForm: FormGroup;
  updateForm: FormGroup;
  updateChange: FormGroup;
  listRole: Roles[];
  image: any;
  user: User = {
    id: 0,
    fullname: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    birthday: '',
    img: '',
    status: 0
  };
  title = 'Quản lý người dùng';
  noti = '';
  sh = '';
  hd = 'hidden';
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  showFormPassWord: Boolean = false;
  errorExistEmail = '';
  keySearch = '';
  errMessage = '';
  imageSrc: any;
  imageBefore: string;
  showMedia: boolean;
  perPage: 5;
  selectForm = [{ name: 'Active', id: '1' }, { name: 'InActive', id: '0' }];
  baseURL = '';
  constructor(
    public service: UserService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu,
    private menuFilter: MenuFilterService,
    private notifier: NotifierService
  ) {
  }
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;
  async ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    this.titleService.setTitle('Testonline System - User');
    this.insertForm = this.fb.group({
      fullname: [
        '',
        [validatorEmptyInput,Validators.required, Validators.maxLength(50)
        ]
      ],
      email: ['', [Validators.required,
                  Validators.email,
                  Validators.pattern(
                    // tslint:disable-next-line:max-line-length
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  ),
                Validators.maxLength(50)]],
      password: [
                  '',
                  [Validators.required,
                  Validators.minLength(6),
                  Validators.maxLength(100),
                  Validators.pattern(/^(?!.* )(?=.*\d)(?=.*[a-z]).{6,100}$/)],
                ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(11),
          Validators.pattern('^[0-9]*$')
        ]
      ],
      address: ['', [Validators.maxLength(255),
      Validators.pattern(/^(?=.*[a-z]).{0,255}$/)]],
      birthday: ['', [validateDOB]],
      img: ['']
    });

    this.updateForm = this.fb.group({
      id: [''],
      fullname: ['', [validatorEmptyInput,Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      phone: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(12)]
      ],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      status: [''],
      img: ['']
    });

    this.updateChange = this.fb.group({
      password: ['', [Validators.minLength(6)]],
      pass: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.pattern(/^(?!.* )(?=.*\d)(?=.*[a-z]).{6,20}$/)
            ]
          ],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        },
        {
          validator: [comparePassword]
        }
      )
    });
    let menuSuccess = await this.menuFilter.checkMenu();
    if (menuSuccess === 1) {
    this.service.getUserList().subscribe(res => {
      this.listUser = res;
      this.perPage = 5;
    });
  }
}
  validateDOB() {
    const dateString = new Date(this.user.birthday);
    const myDate = new Date(dateString);
    const today = new Date();
    if (myDate.getFullYear > today.getFullYear) {
      if (myDate.getMonth > today.getMonth) {
        if (myDate.getDate > today.getDate) {
          return false;
        }
      }
    }
    return true;
  }
  onClickDelete(u: User) {
    this.user = u;
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
    this.service
      .deleteUserbyId(this.user.id)
      .pipe(concatMap(_ => this.service.getUserList()))
      .subscribe(
        res => {
          this.listUser = res;
        },
        err => {
          this.errorExistEmail = 'Xóa không thành công';
        }
      );
    this.popupDelete.hide();
  }
  onClickAddNew() {
    this.title = 'Thêm người dùng';
    this.errorExistEmail = '';
    this.insertForm.reset();
    this.showTable = false;
    this.showMedia = true;
    this.showInsertForm = true;
    this.showUpdateForm = false;
  }
  onChangeFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.showMedia = true;
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.image);
    } else {
      this.imageSrc = '';
    }
  }
  sort(typeSort: string) {
    if (this.listUser !== null) {
      const body = {
        key: this.keySearch,
        type: typeSort
      };
      const formData = new FormData();
      formData.append('data', JSON.stringify(body));
      this.service
        .sortUser(formData)
        .pipe(concatMap(_ => this.service.sortUser(formData)))
        .subscribe(
          res => {
            this.listUser = res;
          },
          err => {
            this.router.navigate(['/error']);
          }
        );
    }
  }
  onClickUpdate(u: User) {
    this.title = 'Chỉnh sửa người dùng';
    this.updateForm.patchValue(u);
    this.updateChange.patchValue(u);
    this.user = u;
    this.showUpdateForm = true;
    this.showTable = false;
    this.showInsertForm = false;
    this.showFormPassWord = true;
  }
  onClickCloseForm() {
    this.title = 'Quản lý người dùng';
    this.showTable = true;
    this.showInsertForm = false;
    this.showUpdateForm = false;
  }
  onSubmitInsert() {
    const { valid, value } = this.insertForm;
    if (valid) {
      const data = value;
      const formData = new FormData();
      formData.append('user', JSON.stringify(data));
      formData.append('image', this.image);
      this.service
        .createUser(formData)
        .pipe(concatMap(_ => this.service.getUserList()))
        .subscribe(
          res => {
            this.title = 'Quản lý người dùng';
            this.listUser = res;
            this.errorExistEmail = '';
            this.showInsertForm = false;
            this.showTable = true;
          },
          err => {
            this.errorExistEmail = err.error.message;
          }
        );
    }
  }
  onSubmitUpdate() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const data = value;
       data.id = this.user.id;;
      const formData = new FormData();
      formData.append('user', JSON.stringify(data));
      formData.append('image', this.image);
      this.service
        .updateUser(formData)
        .pipe(concatMap(_ => this.service.getUserList()))
        .subscribe(
          res => {
            this.title = 'Quản lý người dùng';
            this.listUser = res;
            this.showUpdateForm = false;
            this.showTable = true;
          },
          err => {
            this.errorExistEmail = err.error.message;
          }
        );
    }
  }
  checkSpaceFullName(event) {
    const val = event.target.value;
    this.insertForm.get('fullname').setValue(val.replace(/\s\s+/g, ' '));
  }
  search(event) {
    this.keySearch = event.target.value.trim();
    if (this.keySearch !== '') {
      const body = {
        key: this.keySearch
      };
      const formData = new FormData();
      formData.append('data', JSON.stringify(body));
      this.service
        .searchUser(formData)
        .pipe(concatMap(_ => this.service.searchUser(formData)))
        .subscribe(
          res => {
            this.listUser = res;
          }
        );
    } else {
      this.service.getUserList().subscribe(res => (this.listUser = res));
    }
  }
  activeAccount(email: string) {
    this.service.activeAccout(email).subscribe(res => {
      this.user = res;
    });
  }
  infor(id: number) {
    this.service.getUserbyId(id).subscribe(res => {
      this.router.navigate(['/cms/examhistory', id]);
    });
  }
  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }
  onChange(event) {
    this.perPage = event.target.value;
  }

  trackByFn(index, item) {
    return item.id;
  }
  changePassWord() {
    const { valid, value } = this.updateChange;
    if (valid) {
      this.user.email = this.updateForm.get('email').value;
      this.user.password = this.updateChange.get('pass.password').value;
      const formData = new FormData();
      formData.append('user', JSON.stringify(this.user));
      this.service.changePassWord(formData).subscribe(
        res => {
          this.noti = 'Thay đổi mật khẩu thành công';
          this.hd = 'visible';
          this.sh = 'show';
          setTimeout(() => {
            this.hd = 'hidden';
            this.noti = '';
          }, 1500);
          // this.router.navigate(['/hometotal/profile-user']);
          this.notifier.notify('success', 'Update PassWord success!');
        },
        error => {
          this.errMessage =
            'Thao tác chưa được thực hiện, vui lòng thử lại xong!';
          this.noti = 'Thao tác chưa được thực hiện, vui lòng thử lại xong!';
          this.hd = 'visible';
          this.sh = 'show';
          setTimeout(() => {
            this.hd = 'hidden';
            this.noti = '';
          }, 1500);
        }
      );
    }
  }
}
