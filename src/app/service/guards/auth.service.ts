import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../login/user.service';
import { MenuService } from '../menu/menu.service';
import { Constant } from 'src/app/common/constant';
@Injectable()
export class AuthService {
  menuUser: Object[];
  mapShow = new Map();
  URL = '';
 
  arrayURL = [];
  
  constructor(
    public jwtHelper: JwtHelperService,
    private us: UserService,
    private menuService: MenuService
  ) {}
  public isAuthenticated(): boolean {
    this.us.productUrl = window.location.href
    const token = localStorage.getItem('access_token');
    const url = window.location.href;
    this.arrayURL = url.split(Constant.BASE_URL_FRONTEND);
    const len = this.arrayURL.length;
    this.URL = this.arrayURL[0];
    // Kiểm tra role/ Load lai thong tin khi F5
    if (localStorage.getItem('role') != null) {
      const arrayRole = localStorage.getItem('role').split(',');
      
      const lenght = arrayRole.length;
      if (this.URL.indexOf('hometotal') !== -1) {
        return true;
      }
      if (lenght <= 2) {
        if (arrayRole[0].toLowerCase() === 'User'.toLowerCase()) {
          this.us.role = false;
        } else {
          
        }
      } else {
        
      }
        
      if (!this.jwtHelper.isTokenExpired(token) && this.us.role) {
        return true;
      } else {
        return false;
      }
    }
  }
  
}
