import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from 'src/app/common/constant';
import { Observable } from 'rxjs'
import { Class } from 'src/app/model/class/class';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ClassService {


  constructor(private http: HttpClient) { }
  getListClass(userid: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<Class[]>(Constant.API_GET_ALL_CLASS + '/' + userid, {
      headers: head
    });
  }
  findClassById(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<Class[]>(Constant.API_GET_CLASS_BY_ID + '/' + id, { headers: head })
  }

  // trinh van tai

  getAllClass() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<any>(Constant.BASE_URL + '/class/list',

      {
        headers: head
      });
  }
  updateClass(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<string>(
      Constant.API_UPDATE_CLASS,
      formData,
      {
        headers: head
      });
  }
  createClass(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<string>(
      Constant.API_CREATE_CLASS,
      formData,
      {
        headers: head
      });
  }

  searchClassByName(name: String) {

    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<any>(Constant.BASE_URL + '/class/search' + '?name=' + name,

      {
        headers: head
      });
  }

  sortClass(index: number, collumn: String, key: String) {

    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<any>(Constant.BASE_URL + '/class/sort' + '?index=' + index + '&collumn=' + collumn + '&key=' + key,

      {
        headers: head
      });
  }


  deleteClassById(classid: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.delete<any>(Constant.BASE_URL + '/class/delete/' + classid, {
      headers: head
    })
  }


  changeClassStatus(classid: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<any>(Constant.BASE_URL + '/class/update/status/' + classid, {
      headers: head
    })
  }



}
