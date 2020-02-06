import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from 'src/app/common/constant';
import { Registrantion } from 'src/app/model/registrantion';
import { Observable } from 'rxjs';
import { Sort } from 'src/app/model/sort';

@Injectable({
  providedIn: 'root'
})
export class RegistrantionService {

  constructor(private http: HttpClient) { }
  getListRegistrantion(sort:Sort): Observable<Object>{
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_LIST_REGISTRANTION,sort,{
      headers: head
    });
  }
  
  getRegistrantionById(registrantionId: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<Registrantion>(Constant.API_GET_REGISTRANTION + '/' + registrantionId, {
      headers: head
    });
  }

  checkValidateDonotProductDonotExit(id: number,productId:number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<boolean>(Constant.API_CHECK_REGISTRANTION + '/' + id + '/product/' + productId,{
      headers: head
    });
  }
  checkValidateStartDate(registrantion:Registrantion):Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_CHECK_STARTDATE + '/startDate' ,registrantion,{
      headers: head,responseType: 'text'
    });
  }
  checkValidateStartDateVsEndDate(registrantion:Registrantion):Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_CHECK_STARTDATE_VS_ENDDATE ,registrantion,{
      headers: head,responseType: 'text'
    });
  }

  update(registrantionId: number, status: number): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get(Constant.API_EDIT_REGISTRANTION_STATUS + '?registrantionId=' + registrantionId + '&status=' + status, {
      headers: head
    });
  }
  add(registrantion:Registrantion ): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_ADD_REGISTRANTION, registrantion,{
      headers: head,responseType: 'text'
    });
  }
}