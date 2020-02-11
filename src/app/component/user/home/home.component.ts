import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlideBars } from 'src/app/model/slidebar/slidebar';
import { SlidebarService } from 'src/app/service/slidebar/slidebar.service';
import { UserService } from 'src/app/service/login/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Viewnewslist } from 'src/app/model/viewnewslist/viewnewslist';
import { ViewnewslistService } from 'src/app/service/viewnewslist/viewnewslist.service';
import { Newpost } from 'src/app/model/Newpost/Newpost';
import { DatatranferService } from 'src/app/service/datatranfer/datatranfer.service';
import { ExamService } from 'src/app/service/exam/exam.service';
import { NewpostService } from 'src/app/service/newpost/newpost.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { Constant } from 'src/app/common/constant';
import { Roles } from 'src/app/model/role/Roles';
import { map, tap } from 'rxjs/operators';
import { Product } from 'src/app/model/product/product';
import { ProductService } from 'src/app/service/product/product.service';
import { MatDialog } from '@angular/material';
import { InformationPopupComponent } from './information-popup/information-popup.component';
import { NotifierService } from 'angular-notifier';

export interface PeriodicElement {
  title: string;
  content: string;
  status: string;
  create_date: string;
  confirm_date: string;
  active_status: boolean;
  confirm_person: string;
  pin_news: boolean;
  tags: string;
  productId:string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // slidebar   // Mảng ảnh + slogan + title của sildeshow
  slideBarActive: SlideBars[] = [];
  examId: number;
  products: Product[] = [];
  exams:Object[]=[];
  entryTest:Object[]=[];
  examOften:Object[]=[];
  // Thông tin user đăng nhập
  adminName: string;
  tokens: string;
  idExam: number;
  tenBaiThi: string;
  chuDeBaiThi: string;
  // Biến để ẩn menu mobile - profile
  menuMobile = 'none';
  showProfilePannel = 'none';
  checkStatusShowProfilePanel = false;
  checkStatusSidebarMobile = false;
  route: string;
  perPage1 = 5;
  view2: Viewnewslist[] = [];
  news2: Viewnewslist;
  newpost: Newpost;
  // Lấy list Pinned news
  listPinnedNews: Object[] = [];
  // Lấy practice homepage list
  listPractice: Object[] = [];
  // Param practice
  URL = '';
  arrayURL = [];
  exam: any;
  examResultID: Number;
  userID: number;
  notificationVisibilityWhenVaoThi = false;
  notificationVisibilityWhenMaxAttemptExcess = false;
  baseURL = '';
  listRole: Roles[] = [];
  temp = 0;
  max_attemp = 0;
  perPage: number;
  checkAvaiableVaoThi = false;
  searchBoolean = true;
  listExam: Object[]=[];
  searchKey = '';
  selectedType = '^0$|^1$';
  code='';
  slideConfig1={
    "slidesToShow": 1, 
  "slidesToScroll":1,
  "nextArrow":"<div class='nav-btn1 next-slide'>&#10095;</div>",
  "prevArrow":"<div class='nav-btn1 prev-slide'>&#10094;</div>",
  "infinite": true,
  }
  slideConfig = {
  "slidesToShow": 3,
  "slidesToScroll":3,
  "nextArrow":"<div class='nav-btn next-slide'>&#10095;</div>",
  "prevArrow":"<div class='nav-btn prev-slide'>&#10094;</div>",
  "infinite": true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]


};
  constructor(
    private slidebarService: SlidebarService,
    private userService: UserService,
    private jwt: JwtHelperService,
    private us: UserService,
    private router: Router,
    private viewlistnews: ViewnewslistService,
    private datatranfer: DatatranferService,
    private examService: ExamService,
    private newpostService: NewpostService,
    private titleService: Title,
    private productService: ProductService,
    config: NgbCarouselConfig,
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog,
    private notifierService: NotifierService,

  ) {
    // Config silder show
    // Ẩn hiện các nút
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
  }
  isMobile = false;
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;

    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    this.perPage = 6;
    const url = window.location.href;
    this.arrayURL = url.split('/');
    const len = this.arrayURL.length;
    this.URL = this.arrayURL[len - 2] + '/' + this.arrayURL[len - 1];

    if (localStorage.getItem('role')) {
      const arrayRole = localStorage.getItem('role').split(',');
      const lenght = arrayRole.length;
      if (lenght <= 2) {
        if (arrayRole[0].toLowerCase() === 'User'.toLowerCase()) {
          this.userService.role = false;
        } else {
          this.userService.role = true;
        }
      } else {
        this.userService.role = true;
      }
    }
    this.notificationVisibilityWhenVaoThi = false;
    this.notificationVisibilityWhenMaxAttemptExcess = false;
    this.titleService.setTitle('CMS - Home');
    // Get listPINNED NEWS
    this.newpostService
      .getListPageNewsNews()
      .subscribe(res => (this.listPinnedNews = res));


    // Get practice homepage list
    this.examService.getListPracticeHomepage().subscribe(res => {
      this.listPractice = res;
      this.examService.getExamByExamDemo().subscribe(exam=>(this.exams=exam)

    );
    this.examService.getExamByEntryTest().subscribe(entry_test=>(this.entryTest=entry_test));
    this.examService.getExamByExamOften().subscribe(exam_often=>(this.examOften=exam_often));
    });
    // Slidebar
    this.slidebarService.getListSlideBarActive().subscribe(res => {
      this.slideBarActive = res;
    });
    // Lấy thông tin user đã login
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    this.tokens = token;
    if (token != null) {
      this.us.getUserbyEmail(token['username']).subscribe(res => {
        this.adminName = res.fullname;
        if (this.URL === 'hometotal/home') {
          history.pushState(null, null, location.href);
          window.addEventListener('popstate', function() {
            history.pushState(null, null, location.href);
            // this.location.reload();
          });
        }
      });
    } else {
      this.adminName = '';
    }
    this.titleService.setTitle('CMS-Home');
  //  this.loadProducts();
    this.examService.getListExam(this.searchKey,this.selectedType).subscribe(res=>{
      this.listExam = res;


    });
    if (window.screen.width === 360) { // 768px portrait

    }
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };


  }

  // Hàm click các thẻ tin sẽ chuyển đến viewnews
  onViews(event) {
    this.viewlistnews.getViewnNewsbyId(event).subscribe(res => {
      this.newpost = {
        title: res['title'],
        linkimage: res['linkimage'],
        description: res['description'],
        tags: res['tags'],
        content: res['content'],
        creator: 1
      };
      this.datatranfer.changeMessage2(this.newpost);
      this.router.navigate(['hometotal/pagenews/news/viewnews/' + event]);
    });
    if (!(typeof this.newpost === 'undefined')) {
      this.router.navigate(['hometotal/pagenews/news/']);
    }
  }
  // Xem chi tiet


  // Xử lý sự kiến click vào thi POP UP xuất hiện để confirm


  oncgNotLogin() {
    this.notificationVisibilityWhenMaxAttemptExcess = false;
  }
  // oncg(event: boolean) {
  //   if (event) {
  //     const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
  //     if (token != null) {
  //       const examResult = {
  //         email: token['username'],
  //         exam_id: this.exam.id
  //       };
  //       const formData = new FormData();
  //       formData.append('examResult', JSON.stringify(examResult));
  //       this.examService.getStartExam(formData).subscribe(
  //         res => {
  //           this.examResultID = res;
  //           this.router.navigate([
  //             '/hometotal/testpractice',
  //             { param1: this.exam.id, param2: this.examResultID }
  //           ]);
  //         },
  //         error => {

  //         }
  //       );
  //     } else {
  //       this.router.navigate([
  //         '/hometotal/testfreedom',
  //         { param1: this.exam.id }
  //       ]);
  //     }
  //   } else {
  //     this.notificationVisibilityWhenVaoThi = false;
  //   }
  // }

  // Ham check user login đã làm quá số lượt chưa?

  // Phan trang
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }


  slickInit(e) {

  }

  breakpoint(e) {

  }

  afterChange(e) {

  }

  beforeChange(e) {

  }
  clickRegis(exam){
    this.exam=exam;
    // const dialogRef = this.dialog.open(InformationPopupComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   if(result!=null){
    //   const examResult = {
    //     email: '',
    //     exam_id: exam.id,
    //     code: result
    //   };
    //   const formData = new FormData();
    //   formData.append('examUser', JSON.stringify(examResult));
    //   this.examService.getStartExam(formData).subscribe(
    //     res => {
    //       this.router.navigate([
    //         '/hometotal/testprocess',
    //         {
    //           param1: exam.id,
    //           param2: res,
    //           param3:exam.name,
    //           param4:exam.title
    //         }
    //       ]);
    //     },
    //     error => {

    //       this.notifierService.notify('error',error.error.message, '');
    //     }
    //   );
    //   }
    //  });
  }
  clickRegisExamDemo(exam){
    this.router.navigate([
      '/hometotal/examdemo',
      {
        param1: exam.id
      }
    ]);
  }
  regis(){
      const examResult = {
        email: '',
        exam_id: this.exam.id,
        code: this.code
      };
      const formData = new FormData();
      formData.append('examUser', JSON.stringify(examResult));
      this.examService.getStartExam(formData).subscribe(
        res => {
          this.router.navigate([
            '/hometotal/testprocess',
            {
              param1: this.exam.id,
              param2: res,
              param3:this.exam.name,
              param4:this.exam.title
            }
          ]);
        },
        error => {

          this.notifierService.notify('error',error.error.message, '');
        }
      );
  }
//   loadProductDetail(){
//     this.activateRoute.paramMap.subscribe(params => {
//       this.productId = params.get('id');
//     this.router.navigate(['home/product/detail']);

//   });
// }

 // Xem chi tiet Exam
 clickXemChiTiet(id: number, quahan: boolean, qualuot: boolean) {
  this.router.navigate([
    '/hometotal/examdetail',
    {
      paramId: id,
      paramQuahan: quahan,
      paramQualuot: qualuot
    }
  ]);
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
      this.notifierService.notify('error', 'ban da thi', '');
    }
  );
}

}

