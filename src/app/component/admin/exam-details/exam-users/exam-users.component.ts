import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ExamService } from 'src/app/service/exam/exam.service';
import { User } from 'src/app/model/user/users';
import { UserService } from 'src/app/service/login/user.service';
import { concatMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Constant } from 'src/app/common/constant';
import { NotifierService } from 'angular-notifier';
import { GroupService } from 'src/app/service/group/group.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Exam } from 'src/app/model/exam/exam';
import { Group } from 'src/app/model/group/group';

@Component({
  selector: 'app-exam-users',
  templateUrl: './exam-users.component.html',
  styleUrls: ['./exam-users.component.scss']
})
export class ExamUsersComponent implements OnInit {
  data: any;
  userInvite = {
    userDelete: '',
    userInsert: '',
  };
  groupInvite = {
    groupInsert: ''
  }
  listUser: any;
  showInsertForm: boolean;
  showTable: boolean;
  users: any;
  groups: any;
  dropdownSettingUser = {};
  dropdownSettingGroup = {};
  updateForm: any;
  showInsert: boolean;
  file: any;
  fileExist: any;
  examType: number;
  exam: Exam;
  showTableEntry: boolean;
  listUserEntry: any;
  selectedGroup: [];
  selectedUser: [];
  urlDownloadFile = Constant.API_DOWNlOAD_FILE_EXAM_USER;

  constructor(
    private activeRoute: ActivatedRoute,
    private examService: ExamService,
    private userService: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private groupService: GroupService,
    private notifier: NotifierService) {
  }

  ngOnInit() {
    this.showInsertForm = false;
    this.showTable = true;
    this.showInsert = false;
    this.activeRoute.parent.params
      .subscribe(paramsParent => {
        // Get parent route param
        this.data = paramsParent['id']
      });
    this.examService.getExamById(this.data).subscribe(res => {
      this.exam = res;
      this.examType = this.exam.examMode;
      if (this.examType === 1) {
        this.showTable = false;
        this.showTableEntry = true;
        this.examService.getExamUserByExamId(this.data).subscribe(res => {
          this.listUserEntry = res;
        });
      }
      else {
        this.examService.getExamUserByExamId(this.data).subscribe(res => {
          this.listUser = res;
        });
        this.examService.getRestUser(this.data).subscribe(res => {
          this.users = res;
        });
        this.groupService.getListGroup2().subscribe(res => {
          this.groups = res;
        })
        this.showTable = true;
        this.showTableEntry = false;
      }
    });
    this.dropdownSettingUser = {
      singleSelection: false,
      idField: '0',
      textField: '3',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search',
      allowSearchFilter: true
    };
    this.dropdownSettingGroup = {
      singleSelection: false,
      idField: '0',
      textField: '1',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search',
      allowSearchFilter: true
    };
  }
  // onClickAddNew() {
  //   this.showInsertForm = true;
  //   this.showTable = false;
  //   this.list.user_id_before = [];
  //   this.list.user_id = [];
  //   this.userService.getUserList().subscribe(res => {
  //     (this.users = res);
  //   });
  //   this.examService.getExamUserByExamId(this.data).subscribe(res => {

  //     this.userBefore = res;
  //     if (this.userBefore.length > 0) {
  //       this.userBefore.forEach(element => {
  //         this.list.user_id_before.push(element.id);
  //       });
  //     }
  //   });
  // }
  // onClickSubmit() {
  //   this.showTable = true;
  //   this.showInsertForm = false;
  // }

  // onClickCloseForm() {
  //   this.showInsertForm = false;
  //   this.showTable = true;
  // }
  onItemSelect(item: any) { }
  onSelectAll(items: any) { }
  onSubmitUpdate() {
    this.userInvite.userInsert = this.selectedUser.map((function (item) { return item[0]; })).toString();
    const formData = new FormData();
    formData.append('id', this.data);
    formData.append('invite', JSON.stringify(this.userInvite));
    this.examService.updateUserExam(formData).subscribe(res => {
      this.notifier.notify('success', 'Add user success!');
      this.showTable = true;
      this.selectedUser = [];
      this.examService.getExamUserByExamId(this.data).subscribe(res => {
        this.listUser = res;
      });
      this.examService.getRestUser(this.data).subscribe(res => {
        this.users = res;
      });
      this.groupService.getListGroup2().subscribe(res => {
        this.groups = res;
      })
    });

  }
  addGroup() {
    //  this.updateInvite.groupInsert = list.group_id.id;
    this.groupInvite.groupInsert = this.selectedGroup.map((function (item) { return item[0]; })).toString();
    console.log(this.groupInvite);
    const formData = new FormData();
    formData.append('id', this.data);
    formData.append('invite', JSON.stringify(this.groupInvite));
    this.examService.updateUserExam(formData).subscribe(res => {
      this.notifier.notify('success', 'Add user success!');
      this.showTable = true;
      this.selectedGroup = [];
      this.examService.getExamUserByExamId(this.data).subscribe(res => {
        this.listUser = res;
      });
      this.examService.getRestUser(this.data).subscribe(res => {
        this.users = res;
      });
      this.groupService.getListGroup2().subscribe(res => {
        this.groups = res;
      })
    });
  }

  getListQuestion2() {
    const formData = new FormData();
  }

  onAddExcel(event) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.fileExist = 1;
    } else {
      this.fileExist = 0;
    }
  }
  getListQuestion() {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('exam', this.data);
    this.examService.importUserExam(formData).subscribe(res => {
      let i = res;
      if (i == 0) {
        this.notifier.notify('error', 'Import user fail!');
      }
      else {
        this.notifier.notify('success', 'Import  ' + i + '   users');
      }
      this.examService.getExamUserByExamId(this.data).subscribe(res => {
        this.listUserEntry = res;
        this.showTable = false;
        this.showTableEntry = true
        this.showInsertForm = false;
      });
    })
  }
}
