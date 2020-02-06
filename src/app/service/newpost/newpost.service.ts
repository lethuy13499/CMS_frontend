import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Newpost } from '../../model/Newpost/Newpost';
import { Constant } from '../../common/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewpostService {
  constructor(private http: HttpClient) {}
  createNewpost(newp: Newpost) {
    return (
      Constant.API_INSERT_NEWS +
      '?title=' +
      newp.title +
      '&linkimage=' +
      newp.linkimage +
      '&description=' +
      newp.description +
      '&allTags=' +
      newp.tags +
      '&content=' +
      newp.content +
      '&creatorId=' +
      newp.creator
    );
  }
  addNewpost(formdata :FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_NEWS,formdata , {
      headers: head
      
    });
  }
  updateNew(formdata:FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_NEWS,formdata , {
      headers: head
      
    });
  }


  getListPageNewsNews() {
    return this.http.get<Object[]>(Constant.API_GET_ALL_PAGENEWS_NEWS);
  }
  getListPinnedNews() {
    return this.http.get<Object[]>(Constant.API_GET_ALL_PINNED_NEWS);
  }
  getListNewDesc(){
    return this.http.get<Object[]>(Constant.API_GET_ALL_DESC);
  }
}
