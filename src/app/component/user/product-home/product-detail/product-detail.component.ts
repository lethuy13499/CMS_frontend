import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import { Title } from '@angular/platform-browser';
import { mergeMap } from 'rxjs/operators';
import { Product } from 'src/app/model/product/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrantionService } from 'src/app/service/registrantion/registrantion.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/service/login/user.service';
import { Registrantion } from 'src/app/model/registrantion';
import { NotifierService } from 'angular-notifier';
import { Constant } from 'src/app/common/constant';
import { User } from 'src/app/model/user/users';
import { Subscription } from 'rxjs';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Exam } from 'src/app/model/exam/exam';
import { Popup } from 'ng2-opd-popup';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit,OnDestroy {
  product: Product;
  adminname = '';
  adminemail = '';
  idadmin: number;
  message: string = '';
  message1: string = '';
  validate: string = '';
  insertForm: FormGroup;
  user: User;
  baseURL = '';
  paramID: any;
  check: boolean;
  checkDate: boolean;
  checkEndDate: boolean;
  registration: Registrantion = new Registrantion();
  public subcrition: Subscription;
  exam: Exam
  idExam: number;
  tenBaiThi: string;
  chuDeBaiThi: string;
  @ViewChild('popuppractice') popuppratice: Popup;
  examResultID: Number;
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private jwt: JwtHelperService,
    private titleService: Title,
    private productService: ProductService,
    private registrationService: RegistrantionService,
    private notifierService: NotifierService,
    private fb: FormBuilder,
    private examService: ExamService,
    private router: Router,

  ) {

  }

  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    this.titleService.setTitle('Testonline System - Exam Detail');
    this.loadData();
    this.checkValidate();
    this.insertForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      discription: [''],
      product: this.fb.group({
        productId: [],
      }),
      user: this.fb.group({
        id: [],
      }),
    })

  }

  ngOnDestroy() {
    if (this.subcrition) {
      this.subcrition.unsubscribe();
    }
  }
  clickVaoThi1(id: number, ten: string, chude: string) {
    this.idExam = id;
    this.tenBaiThi = ten;
    this.chuDeBaiThi = chude;
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    const examResult = {
      email: token['username'],
      exam_id: this.idExam,
      code:''
    };
    const formData = new FormData();
    formData.append('examUser', JSON.stringify(examResult));
    this.examService.getStartExam(formData).subscribe(
      res => {
        this.examResultID = res;
        this.router.navigate([
          '/hometotal/testprocess',
          {
            param1: this.idExam,
            param2: this.examResultID,
            param3: this.tenBaiThi,
            param4: this.chuDeBaiThi
          }
        ]);
      },
      error => {
        this.notifierService.notify('error', error.error.message, '');
      }
    );
  }

  addRegistration() {
    this.insertForm.get('user.id').setValue(JSON.parse(localStorage.getItem('item')).id);
    this.insertForm.get('product.productId').setValue(this.registration.product.productId);
    this.subcrition=this.registrationService.add(this.insertForm.value).subscribe((data: Response) => {
      this.notifierService.notify('success', data.toString(), '');
      this.check=false;
      this.loadData();
    })
  }

  loadData() {
    this.activatedRoute.paramMap.pipe(
      mergeMap(params => {
        const id = Number.parseInt(params.get('id'));
     //   this.registration.product.productId = id;
        return this.examService.getExamById(id);
      })
    ).subscribe(pd => {
      this.exam = pd;
      
    });
  }

  checkValidate() {
    this.registrationService.checkValidateDonotProductDonotExit(JSON.parse(localStorage.getItem('item')).id, this.registration.product.productId).subscribe(data => {
      this.check = data;
    })
  }

  validateStartDate(value) {
    this.registration.startDate = value;
    this.registrationService.checkValidateStartDate(this.registration).subscribe((data: Response) => {
      this.message = data.toString();
      if (this.message !== "") {
        this.checkDate = true;
      } else {
        this.checkDate = false;
      }
    })
  }

  validateStartDateVsEndDate(value) {
    this.registration.endDate = value;
    this.registrationService.checkValidateStartDateVsEndDate(this.registration).subscribe((data: Response) => {
      this.message1 = data.toString();
      if (this.message1 !== "") {
        this.checkEndDate = true;
      } else {
        this.checkEndDate = false;
      }
    })
  }
}