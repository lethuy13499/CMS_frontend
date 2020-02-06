import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from 'src/app/common/constant';
import { Unit } from 'src/app/model/unit/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) {}

  createUnit(formdata: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_CREATE_UNIT, formdata, {
      headers: head
    });
  }

  editUnit(formdata: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_EDIT_UNIT, formdata, {
      headers: head
    });
  }

  getUnitByChapterAndOrderASC(chapterId: number){
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_CREATE_UNIT + chapterId , {
      headers: head
    });
  }

  getUnitById(id:number){
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Unit>(Constant.API_GET_UNIT_BY_ID + id , {
      headers: head
    });
  }

  deleteUnit(unitId: number){
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.delete(Constant.API_DELETE_UNIT + '/' + unitId, {
      headers: head
    });
  }
}
