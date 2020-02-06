import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Constant } from 'src/app/common/constant';

@Injectable()
export class AuthGuardService implements CanActivate {
  role: boolean;
  roleArray: string[] = [];
  menuUser: Object[];
  mapShow = new Map();
  arrURL = [];
  URL: string;
  constructor(public auth: AuthService, public router: Router) {

   

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const backURL = window.location.href;
    
    const URL = backURL.split(Constant.BASE_URL_FRONTEND);
    
    localStorage.setItem('backURL', URL[1]);
    if (localStorage.getItem('access_token')) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}



