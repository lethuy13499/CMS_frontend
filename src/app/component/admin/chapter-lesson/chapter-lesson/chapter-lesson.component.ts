import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked   } from '@angular/core';
import { chapter } from 'src/app/model/chapter/chapter';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { concatMap } from 'rxjs/operators';
import { subject } from 'src/app/model/subject/subject';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { Title } from '@angular/platform-browser';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Exam } from 'src/app/model/exam/exam';
import { AngularEditorConfig } from '@kolkov/angular-editor';

// export const contenttypes = [
//   {
//     id: 1,
//     value: "Standard lesson"

//   }, {
//     id: 2,
//     value: "Assignment"
//   },
//   {
//     id: 3,
//     value: "Quiz"
//   },

// ]

@Component({
  selector: 'app-chapter-lesson',
  templateUrl: './chapter-lesson.component.html',
  styleUrls: ['./chapter-lesson.component.scss']
})
export class ChapterLessonComponent implements OnInit {
  listChapter: Object[] = [];
  list: chapter[] = [];
  listUpdate: chapter[] = [];
  listSubject: subject[] = [];
  listExam = [];
  insertForm: FormGroup;
  updateForm: FormGroup;
  chapter: chapter;
  subject: subject;
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  errChapter = '';
  errSubject = '';
  errExam = '';
  perPage = 5;
  idDelete: number;
  parrents: string;
  xyz = '';
  keySearch = '';
  selectedType = '^0$|^1$';
  searchKey = '';
  lsType: 0;
  // contenttype = contenttypes;
  // listContentType: Object[] = [];
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
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;
  constructor(
    private chapterService: ChapterService,
    private subjectService: SubjectService,
    private examService: ExamService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu,
    private menuFilter: MenuFilterService,
    private cdRef:ChangeDetectorRef
  ) {
    // this.menuFilter.checkMenu();
  }

  ngOnInit() {
    this.searchKey = '';
    this.titleService.setTitle('Testonline System - Chapter');
    this.insertForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9.\-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$')]],
      // contentType: ['0'],
      // assignment: [''],
      // exam_name: ['', [Validators.required]],
      subject_name: ['']
          });

          this.updateForm = this.fb.group({
            id: [''],
            // tslint:disable-next-line:max-line-length
            name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9.\-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$')]],
                     });

     this.chapterService.listChapter() .subscribe(res => (this.list = res));

    this.subjectService.getListSubject().subscribe(res => (this.listSubject = res));

    this.examService.getListExam(this.searchKey, this.selectedType).subscribe(res => {
      this.listExam = res;
    });



        }
        onClickAddNew() {
          this.insertForm.reset();
          this.showTable = false;
          this.showInsertForm = true;
          this.showUpdateForm = false;
          this.errChapter = '';
        }
        onClickCloseForm() {
          this.showTable = true;
          this.showInsertForm = false;
          this.showUpdateForm = false;
        }


        trackByFn(index, item) {
          return item.id;
        }
        onChange(event) {
          this.perPage = event.target.value;
        }
        onSubmitInsert() {
          const { valid, value } = this.insertForm;
          if (valid) {
            const chap = value;
            if(chap.subject_name === null) {
              chap.subject_name = '0';
            }
            const formdata = new FormData();
            formdata.append('chapter', JSON.stringify(chap));
            this.chapterService
              .createChapter2(formdata)
              .pipe(concatMap(_ => this.chapterService.listChapter()))
              .subscribe(
                res => {
                  this.list = res;
                  
                  this.showInsertForm = false;
                  this.showTable = true;
                },
                error => {
                  this.errChapter = 'Không được trùng tên chapter và subject ';
                }
              );
          }
        }

        checkSpaceName(event) {
          const val = event.target.value.trim();
          this.insertForm.get('name').setValue(val.replace(/\s\s+/g, ' '));
        }

        onChanges(selectedValue) {
          this.lsType = selectedValue;
          if (selectedValue === 1) {
            this.insertForm.controls['assignment'].setValidators([Validators.required]);
          } else if (selectedValue === 2) {
            this.insertForm.controls['exam'].setValidators([Validators.required]);
          } else {
            this.insertForm.controls['assignment'].setValue('');
            this.insertForm.controls['assignment'].clearValidators();
            this.insertForm.controls['assignment'].updateValueAndValidity();
            this.insertForm.controls['exam'].setValue('');
            this.insertForm.controls['exam'].clearValidators();
            this.insertForm.controls['exam'].updateValueAndValidity();

          }
        }

        // tslint:disable-next-line:use-life-cycle-interface
        ngAfterViewChecked() {
          this.cdRef.detectChanges();
        }

        // update chapter-lesson
        onClickUpdate(chap: chapter) {
          this.updateForm.patchValue(chap);
          this.chapter = chap;
          this.showUpdateForm = true;
          this.showTable = false;
          this.showInsertForm = false;
          this.errSubject = '';
        }
        checkSpaceNameUpdate(event) {
          const val = event.target.value.trim();
          this.updateForm.get('name').setValue(val.replace(/\s\s+/g, ' '));
        }
        removeSeftName(id: number) {
          this.listUpdate = [];
          // tslint:disable-next-line:prefer-const
          let len = this.list.length;
          for (let i = 0 ; i < len ; i++) {
           if (this.list[i].id === id) {
              continue;
           } else { this.listUpdate.push(this.list[i]);
           }
          }
        }
        onSubmitUpdate() {
          const { valid, value } = this.updateForm;
          if (valid) {
            const data = value;
            if(data.subject_name === null) {
              data.subject_name = '0';
            }
            const formdata = new FormData();
            formdata.append('chapter', JSON.stringify(data));
            this.chapterService
              .updateChapter2(formdata)
              .pipe(concatMap(_ => this.chapterService.listChapter()))
              .subscribe(
                res => {
                  this.list = res;
                  this.showUpdateForm = false;
                  this.showTable = true;
                },
                err => {
                  this.errSubject = 'Chương đã tồn tại. vui lòng nhập lại!';
                }
              );
          }
        }

        onClickDelete(chap: chapter) {
          this.chapter = chap;
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
          this.chapterService
            .deleteChapter(this.chapter.id)
            .pipe(concatMap(_ => this.chapterService.listChapter()))
            .subscribe(
              res => {
                this.list= res;
              },
              error => {
                this.router.navigate(['/cms/error']);
              }
            );
          this.popupDelete.hide();
        }
   }


