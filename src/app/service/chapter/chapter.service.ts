import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { chapter } from 'src/app/model/chapter/chapter';
import { Constant } from 'src/app/common/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) { }
  getListChapter() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(Constant.API_GET_ALL_CHAPTER, {
      headers: head
    });
  }

  getListChapter2() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(Constant.API_GET_ALL_CHAPTER2, {
      headers: head
    });
  }

  listChapter() {
    const tk = localStorage.getItem('access_token');
    const rpm = localStorage.getItem('rolePermissionOrMenu');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_GET_ALL_CHAPTER_OBJECT, {
      headers: head
    });
  }
  createChapter(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    const rpm = localStorage.getItem('rolePermissionOrMenu');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_CHAPTER, formdata, {
      headers: head
    });
  }

  createChapter2(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    const rpm = localStorage.getItem('rolePermissionOrMenu');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_CREATE_CHAPTER, formdata, {
      headers: head
    });
  }

  updateChapter(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_CHAPTER, formdata, {
      headers: head
    });
  }
  deleteChapter(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.delete(Constant.API_DELETE_CHAPTER + '/' + id, {
      headers: head
    });
  }
  onSearchChapter(key: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_SEARCh_CHAPTER + '?key=' + key, {
      headers: head
    }
    );
  }
  sortChapterByName() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(Constant.API_SORT_CHAPTER , {
      headers: head
    }
    );
  }
  getLisChapterBySubject(idSubject: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_getLisChapterBySubject + idSubject, {
      headers: head
    });
  }
  getLisChapterBySubjectAndParent(idSubject: number) {
    const tk = localStorage.getItem('access_token');
    const rpm = localStorage.getItem('rolePermissionOrMenu');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_getLisChapterBySubjectAndParent + idSubject, {
      headers: head
    });
  }

  getChapterByID(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<chapter>(
      Constant.API_GET_CHAPTER_BY_ID  + id,
      {
        headers: head
      }
    );
  }

  getChapterBySubjectAndChapterOrderAsc(subjectId: number){
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_LIST_CHAPTER_BY_SUBJECT_AND_ORDER_ASC + subjectId, {
      headers: head
    });
  }

  moveChapterAndUnit(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.put(Constant.REST_API_MOVE_CHAPTER_AND_UNIT, formdata , {
      headers: head
    });
  }
  //thuy
  getListChapterByParentId(){
    const tk = localStorage.getItem('access_token');
    const rpm = localStorage.getItem('rolePermissionOrMenu');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_GET_ALL_CHAPTER_BY_PARENT ,{
      headers: head
    });
  }

  //trung

  findByParentId(parentId: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(
      Constant.API_GETCHAPTER_BY_PARENT + parentId,
      {
        headers: head
      }
    );
  }

  createChapter3(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    const rpm = localStorage.getItem('rolePermissionOrMenu');
    let head = new HttpHeaders();
    
    head = head
      .set('TOKEN', 'Token' + tk);
      return this.http.post(Constant.API_CREATE_BY_CHAPTER, formdata, {
                  headers: head
    });
     }

     updateChapter2(formdata: FormData): Observable<any> {
      const tk = localStorage.getItem('access_token');
      let head = new HttpHeaders();
      head = head
        .set('TOKEN', 'Token' + tk);
      return this.http.post(Constant.API_UPDATE2_CHAPTER, formdata, {
        headers: head
      });
    }

    updateChapter3(formdata: FormData) {
      const tk = localStorage.getItem('access_token');
      let head = new HttpHeaders();
      head = head
        .set('TOKEN', 'Token' + tk);
      return this.http.post(Constant.API_UPDATE3_CHAPTER, formdata, {
        headers: head
      });
    }
    deleteChapter2(id: number) {
      const tk = localStorage.getItem('access_token');
      let head = new HttpHeaders();
      head = head
        .set('TOKEN', 'Token' + tk);
      return this.http.delete(Constant.API_DELETE_CHAPTER + '/' + id, {
        headers: head
      });
    }




}
