import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { subject } from 'src/app/model/subject/subject';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { domain } from 'src/app/model/domain/domain';
import { NotifierService } from 'angular-notifier';
import { DomainService } from 'src/app/service/domain/domain.service';
import { Popup } from 'ng2-opd-popup';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { chapter } from 'src/app/model/chapter/chapter';
@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  subject: subject;
  insertForm: FormGroup;
  insertFormChapter: FormGroup;
  updateForm: FormGroup;
  domain: domain;
  domains: domain[] = [];
  public name: string;
  public statusInActive: number = 0;
  public statusActive: number = 1;
  public id: number;
  public checkUpdate: boolean;
  public checkUpdateSubject: boolean;
  public checkUpdateChapter: boolean;
  public subcrition: Subscription;
  public subjectId: string;
  perPage = 5;
  perPageChapter = 5;
  chapterId: number;
  showTable: Boolean = true;
  showTable1: Boolean = true;
  updateSubjectForm: FormGroup;
  updateChapterForm: FormGroup
  chapters: chapter[] = [];
  chapter: chapter;
  nrSelect: number = 0;
  chaptersByParent: chapter[] = [];
  type: string = 'chapter';;
  @ViewChild('popupDelete') popupDelete: Popup;
  constructor(
    private subjectService: SubjectService,
    private activatedRoter: ActivatedRoute,
    private fb: FormBuilder,
    private notifierService: NotifierService,
    private domainService: DomainService,
    private _location: Location
  ) {

  }
  ngOnDestroy() {
    if (this.subcrition) {
      this.subcrition.unsubscribe();
    }
  }
  ngOnInit() {

    this.getListChapterByParent();
    this.getAllChapterBySubjectId();
    this.getListDomainBySubjectId();
    this.activatedRoter.paramMap.pipe(
      mergeMap(
        params => {
          const id = params.get('id');
          return this.subjectService.getSubjectByID(+id)
        }
      )
    ).subscribe(data => {
      this.subject = data;
      this.updateSubjectForm.patchValue({ id: this.subject.id, created_at: this.subject.created_at, name: this.subject.name, status: this.subject.status });

    }
    );

    this.insertFormChapter = this.fb.group({
      name: ['', Validators.required],
      parent_id: [''],
      chapterOrder: ['', Validators.required],
      status: [''],
      subject: this.fb.group({
        id: [],
      }),
    })

    this.updateChapterForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      parent_id: [''],
      chapterOrder: ['', Validators.required],
      status: [''],
      subject: this.fb.group({
        id: [],
      }),
    })

    this.updateSubjectForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      status: [''],
      created_at: ['']
    })

    this.updateForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      status: [''],
      subject: this.fb.group({
        id: [],
      }),
    })

    this.insertForm = this.fb.group({
      name: ['', Validators.required],
      status: ['',],
      subject: this.fb.group({
        id: [],
      }),
    })
  }

  backClicked() {
    this._location.back();
  }
  getListChapterByParent() {
    this.subjectService.getListChapterByParent().subscribe((data: chapter[]) => {
      this.chaptersByParent = data;
    })
  }

  addChapter() {
    this.insertFormChapter.get('subject.id').setValue(+this.subjectId);
    this.subcrition = this.subjectService.addChapter(this.insertFormChapter.value).subscribe((data: Response) => {
      this.notifierService.notify('success', data.toString(), '');
      this.getAllChapterBySubjectId();
      this.insertFormChapter.reset();
    })

  }
  update() {
    this.subjectService.updateSubjectByDomain(this.updateSubjectForm.value, this.subject.id).subscribe((data: Response) => {
      this.notifierService.notify('success', data.toString(), '');
    })

  }

  onClickUpdate(id: number) {
    this.chapterId = id;
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

  updateStatusChapterBySubject(id: number) {
    this.subcrition = this.subjectService.updateStatusChapterBySubjectId(id).subscribe((data: Response) => {
      this.notifierService.notify('success', data.toString(), '');
      this.getAllChapterBySubjectId();
    });
    this.popupDelete.hide();
  }

  getListDomainBySubjectId() {
    this.activatedRoter.paramMap.pipe(
      mergeMap(
        params => {
          this.subjectId = params.get('id');
          return this.domainService.getDomainBySubjectId(+this.subjectId);
        }
      )
    ).subscribe((domains: domain[]) => {
      this.domains = domains;
    }
    );
  }

  getAllChapterBySubjectId() {
    this.activatedRoter.paramMap.pipe(
      mergeMap(
        params => {
          this.subjectId = params.get('id');
          var chapterId = 0;
          return this.subjectService.getChapterByParentIdAndSubjectId(chapterId, +this.subjectId)
        }
      )
    ).subscribe((chapters: chapter[]) => {
      this.chapters = chapters;
    }
    );

  }

  getAll() {
    this.domainService.getListDomain().subscribe((domains: domain[]) => {
      this.domains = domains
    });
  }

  getDomain(id: number) {
    this.domainService.getDomain(+id).subscribe(data => {
      this.domain = data;
      this.updateForm.patchValue(this.domain);
    });
  }

  // checkName(value) {
  //   if (value !== '') {
  //     this.subjectService.checkName(value).subscribe((data: Response) => {
  //       this.message = data.toString();
  //       if (data.toString() !== '') {
  //         this.checkAdd = false;
  //       } else {
  //         this.checkAdd = true;
  //       }
  //     })
  //   } else {
  //     this.checkAdd = false;
  //   }

  // }

  // checkNameUpdate(name) {
  //   if (name !== '') {
  //     this.subjectService.checkNameUpdate(this.domain.id, name).subscribe((data: Response) => {
  //       this.message1 = data.toString();
  //       if (data.toString() !== '') {
  //         this.checkUpdate = true;
  //       } else {
  //         this.checkUpdate = false;
  //       }
  //     })
  //   } else {
  //     this.checkUpdate = false;
  //   }

  // }

  updateDomain() {
    this.subcrition = this.subjectService.updateDomainBySubject(this.updateForm.value, this.domain.id).subscribe((data: Response) => {
      this.notifierService.notify('success', data.toString(), '');
      this.getListDomainBySubjectId();
    })
  }

  addDomain() {
    this.insertForm.get('subject.id').setValue(+this.subjectId);
    this.subcrition = this.subjectService.createDomainBySubject(this.insertForm.value).subscribe((data: Response) => {
      this.notifierService.notify('success', data.toString(), '');
      this.getListDomainBySubjectId();
      this.insertForm.reset();
    })
  }

  onClickDelete(id: number, type: string) {
    this.id = id;
    this.type = type;
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
    if (this.type === 'chapter') {
      this.subcrition = this.subjectService.updateStatusChapterBySubjectId(this.id).subscribe((data: Response) => {
        this.notifierService.notify('success', data.toString(), '');
        this.getAllChapterBySubjectId();
      });
    }
    else {
      this.subcrition = this.subjectService.deleteDomainBySubjectId(this.id).subscribe((data: Response) => {
        this.notifierService.notify('success', data.toString(), '');
        this.getListDomainBySubjectId();
      });
    }
    this.popupDelete.hide();
  }

  onChange(event) {
    this.perPage = event.target.value;
  }

  getChapter(id: number) {
    this.subjectService.getChapterById(id).subscribe((data: chapter) => {
      this.chapter = data;

      this.updateChapterForm.patchValue({ id: this.chapter.id, name: this.chapter.name, chapterOrder: this.chapter.chapterOrder, parent_id: this.chapter.parent_id, status: this.chapter.status });
    })
  }

  updateChapter() {

    this.updateChapterForm.get('subject.id').setValue(this.subjectId);
    this.subjectService.updateChapterBySubject(this.updateChapterForm.value, this.chapter.id).subscribe((data: Response) => {
      this.notifierService.notify('success', data.toString(), '');
      this.getAllChapterBySubjectId();
    })
  }
  // checkNameSubjectUpdate(name) {
  //   if (name !== '') {
  //     this.subjectService.checkNameSubjectUpdate(this.subject.id, name).subscribe((data: Response) => {
  //       this.message2 = data.toString();
  //       if (data.toString() !== '') {
  //         this.checkUpdateSubject = true;
  //       } else {
  //         this.checkUpdateSubject = false;
  //       }
  //     })
  //   } else {
  //     this.checkUpdateSubject = false;
  //   }
  // }

  // checkNameChapterInsert(name) {
  //   if (name !== '') {
  //     this.subjectService.checkNameChapterInsert(name).subscribe((data: Response) => {
  //       this.message3 = data.toString();
  //       if (data.toString() !== '') {
  //         this.checkAddChapter = false;
  //       } else {
  //         this.checkAddChapter = true;
  //       }
  //     })
  //   } else {
  //     this.checkAddChapter = false;
  //   }
  // }
  // checkNameChapterUpdateDoNotExit(name) {
  //   if (name !== '') {
  //     this.subjectService.checkNameChapterUpdate(this.chapter.id, name).subscribe((data: Response) => {
  //       this.message4 = data.toString();
  //       if (data.toString() !== '') {
  //         this.checkUpdateChapter = true;
  //       } else {
  //         this.checkUpdateChapter = false;
  //       }
  //     })
  //   } else {
  //     this.checkUpdateChapter = false;
  //   }
  // }
 
}

