import { Component, OnInit } from '@angular/core';
import { DataService } from './service/dataservice/dataservice.service';
import { Router } from '@angular/router';
import { UserService } from './service/login/user.service';
import { DateFormatter } from 'ngx-bootstrap';
import { formatDate } from "@angular/common";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constant } from './common/constant';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Testing System Online';
  rememberMe: string;
  // ngo minh anh update timeout
  date: Date = new Date();
  userLogin = {
    id: 0,
    fullname: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    img: '',
    status: 0
  };
  role: boolean;
  // ngo minh anh update timeout
  constructor(private dataService: DataService,
    private router: Router,
    private us: UserService,
    private http: HttpClient) { }
  ngOnInit() {
    this.dataService.currentMessage1.subscribe(rememberMe => {
      this.rememberMe = rememberMe;
    });
    const selef = this;
    window.addEventListener('beforeunload', function (e) {
      if (selef.rememberMe === 'false' || selef.rememberMe === 'undefined') {
        this.localStorage.removeItem('access_token');
        this.localStorage.removeItem('email');
        this.localStorage.removeItem('role');
        this.localStorage.removeItem('item');
        this.localStorage.removeItem('rolePermissionOrMenu');
      }
    });
    const page = window.location.pathname.split('/')[1];
    const checkPath =
      page === 'login' ||
      page === 'register' ||
      page === 'activeregister' ||
      page === 'forgotpass' ||
      page === 'activeforgot';

    const token = window.localStorage.getItem('access_token');
    const item = window.localStorage.getItem('item');
    const role = window.localStorage.getItem('role');
    const permission = window.localStorage.getItem('rolePermissionOrMenu');
    const checklocalStorage =
      token != null || item != null || role != null || permission != null;
    const format = 'dd/MM/yyyy HH:mm:ss';
    const nowDate = this.date;
    const oldDate = window.localStorage.getItem('timeout');
    const locale = 'en-US';
    const formattedDate1 = formatDate(nowDate, format, locale);
    //const formattedDate2 = formatDate(oldDate, format, locale);
    if (checkPath && checklocalStorage && oldDate > formattedDate1) {
      this.router.navigate(['hometotal/home']);
      // ngo minh anh update timeout
    } else if (oldDate < formattedDate1) {
      const tk = localStorage.getItem('access_token');
      let head = new HttpHeaders();
      head = head.set('TOKEN', 'Token' + tk);
      this.http
        .post(Constant.API_CREATE_USER_LOGOUT, null, {
          headers: head
        })
        .subscribe(res => { });
      this.router.navigate(['hometotal/login']);
      localStorage.clear();
      this.userLogin.id = 0;
      this.userLogin.fullname = '';
      this.userLogin.email = '';
      this.userLogin.phone = '';
      this.userLogin.address = '';
      this.userLogin.birthday = '';
      this.userLogin.img = '';
      this.userLogin.status = 0;
      if (this.role === true) {
        this.role = false;
      }
    }
  }
  // ngo minh anh update timeout
}
