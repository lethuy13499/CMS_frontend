import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { ExamService } from 'src/app/service/exam/exam.service';
import { subject } from 'src/app/model/subject/subject';
import { Popup } from 'ng2-opd-popup';
import { ProductService } from 'src/app/service/product/product.service';
import { concatMap } from 'rxjs/operators';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { Product } from 'src/app/model/product/product';

function checkDate(c: AbstractControl): ValidationErrors | null {
  const value = c.value;
  const startDate = new Date(value.startDate).getTime();
  const endDate = new Date(value.endDate).getTime();
  const now = new Date().getTime();
  if (startDate > 0 && endDate > 0) {
    return endDate >= startDate
      ? null
      : {
        twodatenotmatch: true
      };
  }
}
function validatorDate(c: AbstractControl): ValidationErrors | null {
  const value = c.value;
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const today = year + '-' + month + '-' + day;
  if (new Date(value).getFullYear() < 1970) {
    return {
      datenotsatisfy: true
    };
  }
  const date = new Date(value).getTime();
  const now = new Date(today).getTime();
  return date >= now
    ? null
    : {
        datenotsatisfy: true
      };
}

export const contenttypes = [
  {
    id: 1,
    value: "Kì Thi"

  }, {
    id: 2,
    value: "Khóa học"
  },
  {
    id: 3,
    value: "Thực hành"
  },
  {
    id: 4,
    value: "Book"
  }
]


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  insertForm: FormGroup;
  updateForm: FormGroup;
  listSubject: subject[] = [];
  listExam: Object[] = [];
  subId: number;
  listContentType: Object[] = [];
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  errInsert = '';
  deleteId: number;
  perPage = 5;
  keySearch = '';
  listProduct: Object[] = [];
  file: any;
  imageSrc: any;
  searchKey = '';
  selectedSub: any;
  selectedType = '^0$|^1$';
  contenttype = contenttypes;
  product: Product;
  @ViewChild('popupDelete') popupDelete: Popup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private subjectService: SubjectService,
    private examService: ExamService,
    private productService: ProductService,
    private checkRole: CheckRolePermissionOrMenu,
  ) {

  }

  ngOnInit() {
    this.insertForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]],
      thumbnail: ['', [Validators.required, Validators.pattern(/(\.jpg|\.png|\.JPG|\.PNG)$/i)]],
      tagLine: ['', [Validators.maxLength(100)]],
      subject: ['', [Validators.required]],
      exam: [''],
      contentType: ['', [Validators.required]],
      fullInfo: ['', [Validators.required]],
      briefInfo: ['', [Validators.required]],
      documentLink: [''],
      date: this.fb.group(
        {
          startDate: ['', [Validators.required, validatorDate]],
          endDate: ['', [Validators.required, validatorDate]]
        },
        {
          validator: [checkDate]
        }
      ),
      isHot:['', [Validators.required]]
    });
    this.updateForm = this.fb.group({
      productId: [''],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]],
      thumbnail: ['', [Validators.required, Validators.pattern(/(\.jpg|\.png|\.JPG|\.PNG)$/i)]],
      tagLine: ['', [Validators.maxLength(100)]],
      subject: ['', [Validators.required]],
      exam: [''],
      contentType: [''],
      fullInfo: ['', [Validators.required]],
      briefInfo: ['', [Validators.required]],
      documentLink: [''],
      date: this.fb.group(
        {
          startDate: ['', [Validators.required]],
          endDate: ['', [Validators.required]]
        },
        {
          validator: [checkDate]
        }
      ),
      isHot:['', [Validators.required]]
    });
    this.subjectService
      .getListSubject()
      .subscribe(res => (this.listSubject = res));
    this.productService.getlistProduct().subscribe(res => this.listProduct = res);
  }
  onChangeSubject(e) {
    const subId = e.target.value;
    this.examService
      .getListExamBySubjectId(subId)
      .subscribe(res => {
        this.listExam = res;
      }
      );
  }
  onClickAddNew() {
    this.insertForm.reset();
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
      const pro = value;
      if (pro.documentLink === null) {
        pro.documentLink = "null";
      }
      if (pro.tagLine === null) {
        pro.tagLine = "null";
      }
      if (pro.exam === null) {
        pro.exam = "0";
      }
      
      const formdata = new FormData();
      formdata.append('product', JSON.stringify(pro));
      formdata.append('file', this.file);
      this.productService
        .createProduct(formdata).pipe(concatMap(_ => this.productService.getlistProduct())).subscribe(res => {
          this.listProduct = res;
          this.showInsertForm = false;
          this.showTable = true;
        });
    }
    if (this.insertForm.invalid) {
      return;
    }
  }
  onChangeFile(event) {
    if (event.target.files && event.target.files[0]) {
      console.warn(event.target.files)
      this.file = event.target.files[0];
      this.updateForm.get("thumbnail").setValue(this.file.name);
      this.product.thumbnail = this.file.name;
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      
      reader.readAsDataURL(this.file);
    } else {
      this.imageSrc = '';
    }
  }
  onClickDelete(pro: Product) {
    this.product = pro;
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
    this.productService
      .deleteProduct(this.product.productId)
      .pipe(concatMap(_ => this.productService.getlistProduct()))
      .subscribe(
        res => {
          this.listProduct = res;
        },
        error => {
          this.router.navigate(['/cms/error']);
        }
      );
    this.popupDelete.hide();
  }

  onClickUpdate(pro: Product) {
    this.product = pro;
    this.updateForm.get('subject').setValue(pro.subjects.id);
    if (pro.exams === null) {
      this.updateForm.get('exam').setValue(0);
    } else {
      this.updateForm.get('exam').setValue(pro.exams.id);
    }
    this.updateForm.get('date.startDate').setValue(pro.startDate);
    this.updateForm.get('date.endDate').setValue(pro.endDate);
    this.updateForm.patchValue(pro);
    this.examService.getListExamBySubjectId(this.product.subjects.id).subscribe(res => {
    this.listExam = res;
    });
    this.showUpdateForm = true;
    this.showTable = false;
    this.showInsertForm = false;
  }
  onSubmitUpdate() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const data = value;
      if (data.documentLink === null) {
        data.documentLink = "null";
      }
      if (data.tagLine === null) {
        data.tagLine = "null";
      }
      if (data.exam === null) {
        data.exam = "0";
      }
      const formdata = new FormData();
      formdata.append('product', JSON.stringify(data));
      formdata.append('file', this.file);
      this.productService
        .editProduct(formdata)
        .pipe(concatMap(_ => this.productService.getlistProduct()))
        .subscribe(
          res => {
            this.listProduct = res;
            this.showUpdateForm = false;
            this.showTable = true;
          }
        );
    }
  }
  search(event) {
      const body = {
      key: event.target.value.trim(),
      type: 'search'
    };
    if (body.key === '') {
      this.productService
        .getlistProduct()
        .subscribe(res => (this.listProduct = res));
    } else {
      const formdata = new FormData();
      formdata.append('data', JSON.stringify(body));
      this.productService
        .searchProduct(formdata)
        .subscribe(res => (this.listProduct = res));
    }
  }
  // nmanh
  filterByContent(event) {
    this.keySearch = event.target.value.trim();
    if (this.keySearch !== '') {
      const body = {
        key: this.keySearch
      };
      const formData = new FormData();
      formData.append('data', JSON.stringify(body));
      this.productService.searchcontent(formData).subscribe(
        res => {
          this.listProduct = res;
        },
        err => {
          this.router.navigate(['/error']);
        }
      );
    } else {
      this.productService
        .getlistProduct()
        .subscribe(res => (this.listProduct = res));
    }
  }

  // sort(name: string) {
  //   if (this.listProduct !== null) {
  //     const body = {
  //       name: name
  //     };
  //     this.productService
  //       .sortDomainByName(name)
  //       .pipe(concatMap(_ => this.productService.sortDomainByName(name)))
  //       .subscribe(
  //         res => {
  //           this.listProduct = res;
  //         }
  //       );
  //   }
  // }

  trackByFn(index, item) {
    return item.id;
  }

  onChange(event) {
    this.perPage = event.target.value;
  }
  checkRolePermission(actionController): boolean {
    return this.checkRole.checkRole(actionController);
  }
}
