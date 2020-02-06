import { Injectable } from '@angular/core';
import { subject } from 'src/app/model/subject/subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from 'src/app/common/constant';
import { Observable } from 'rxjs';
import { domain } from 'src/app/model/domain/domain';
import { chapter } from 'src/app/model/chapter/chapter';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http: HttpClient) { }

  // MR DUC GET SUBJECT BY ID
  getSubjectByID(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<subject>(
      Constant.API_GET_SUBJECT_BY_ID + '?id=' + id,
      {
        headers: head
      }
    );
  }
  getChapterByParentIdAndSubjectId(chapterId: number,subjectId: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(
      Constant.API_GET_CHAPTER_BY_PARENTID_AND_SUBJECT_ID + '/' + chapterId + '/subject' + '/' + subjectId,
      {
        headers: head
      }
    );
  }
  getChapterById(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<chapter>(
      Constant.API_GET_CHAPTER_BY_ID_AND_SUBJECT_ID + '/' + id ,
      {
        headers: head
      }
    );
  }
  getListSubject() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<subject[]>(Constant.API_GET_ALL_SUBJECT, {
      headers: head
    });
  }
  // tslint:disable-next-line:no-shadowed-variable
  createSubject(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_SUBJECT, formdata, {
      headers: head
    });
  }
  createDomainBySubject(domain: domain): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_DOMAIN_BY_SUBJECTID, domain, {
      headers: head, responseType: 'text'
    });
  }
  getListChapterBySubjectId(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_GET_ALL_CHAPTER_BY_SUBJECT_ID + '/' + id, {
      headers: head
    });
  }
  getListChapterByParent() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_GET_ALL_CHAPTER_BY_PARENT_ID, {
      headers: head
    });
  }

  addChapter(chapter: chapter) : Observable<any>{
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_ADD_CHAPTER, chapter, {
      headers: head, responseType: 'text'
    });
  }
  updateChapterBySubject(chapter: chapter, id: number): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.put(Constant.API_UPDATE_CHAPTER_BY_SUBJECT + '/' + id, chapter, {
      headers: head, responseType: 'text'
    });
  }
  updateSubjectByDomain(subject: subject, id: number): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.put(Constant.API_UPDATE_SUBJECT_BY_DOMAIN + '/' + id, subject, {
      headers: head, responseType: 'text'
    });
  }

  updateDomainBySubject(domain: domain, id: number): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_DOMAIN_BY_SUBJECTID + '/' + id, domain, {
      headers: head, responseType: 'text'
    });
  }

  checkName(name: string): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_CHECK_NAME, name, {
      headers: head, responseType: 'text'
    });
  }
  checkNameChapterInsert(name: string): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_CHECK_NAME_CHAPTER, name, {
      headers: head, responseType: 'text'
    });
  }
  checkNameChapterUpdate(id:number,name: string): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_CHECK_NAME_CHAPTER_UPDATE+ '/' + id, name, {
      headers: head, responseType: 'text'
    });
  }
  checkNameSubjectUpdate(id:number,name: string): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_CHECK_NAME_SUBJECT_UPDATE+ '/' + id, name, {
      headers: head, responseType: 'text'
    });
  }
  checkNameUpdate(id: number, name: string): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_CHECK_NAME_UPDATE + '/' + id, name, {
      headers: head, responseType: 'text'
    });
  }

  deleteDomainBySubjectId(id: number): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get(Constant.API_DELETE_DOMAIN_BYSUBJECT_ID + '/' + id, {
      headers: head, responseType: 'text'
    });
  }

  updateStatusChapterBySubjectId(id: number): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get(Constant.API_UPDATE_STATUS_CHAPTER_BYSUBJECT_ID + '/' + id, {
      headers: head, responseType: 'text'
    });
  }

  updateSubject(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_SUBJECT, formdata, {
      headers: head
    });
  }

  updateStatusSubject(subjectId: number): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get(Constant.API_UPDATE_STATUS_SUBJECT + '/' + subjectId, {
      headers: head, responseType: 'text'
    });
  }

  deleteSubject(subjectId: number): Observable<any> {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get(Constant.API_DELETE_SUBJECT + '/' + subjectId, {
      headers: head,
      responseType:'text'
    });
  }

  onSearchSubject(key: string) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<subject[]>(
      Constant.API_SEARCh_SUBJECT + '?key=' + key,
      {
        headers: head
      }
    );
  }
  // sortSubjectByName(name: string) {
  //   return this.http.get<subject[]>(
  //     Constant.API_SORT_SUBJECT + '?name=' + name
  //   );
  // }

  sortSubjectByName() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<subject[]>(
      Constant.API_SORT_SUBJECT,
      {
        headers: head
      }
    );
  }
}
