import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constant } from 'src/app/common/constant';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/model/exam/exam';
import { User } from 'src/app/model/user/users';
import { Group } from 'src/app/model/group/group';
import { Http, ResponseContentType, RequestOptions } from '@angular/http';
import { ExamUser } from 'src/app/model/ExamUser';
import { ExamSetting } from 'src/app/model/examSetting/ExamSetting';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private http: HttpClient) { }
  // MR DUC
  getListPracticeHomepage() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(Constant.API_GET_PRACTICE_HOMEPAGE, {
      headers: head
    });
  }
  getListPracticeByUser(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_LIST_PRACTICE_BY_USER + '?user_id=' + id,
      {
        headers: head
      }
    );
  }
  // getExams(id: number) {
  // // getListPracticeByUser(id: number) {
  // //   return this.http.get<Object[]>(
  // //     Constant.API_GET_LIST_PRACTICE_BY_USER + '?user_id=' + id
  // //   );
  // // }
  getExamsByIDS(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<any>(Constant.API_GET_EXAM_BY_IDS + '?id=' + id, {
      headers: head
    });
  }
  // MR DUC

  getListExam(searchKey: string, type: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('searchKey', searchKey);
    params = params.append('type', type);
    head = head.set('TOKEN', 'Token' + tk);

    return this.http.get<Object[]>(Constant.API_LIST_EXAM, {
      headers: head,
      params: params
    });
  }
  createExam(formdata: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<any>(Constant.API_INSERT_EXAM, formdata, {
      headers: head
    });
  }
  updateExam(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<any>(Constant.API_UPDATE_EXAM, formdata, {
      headers: head
    });
  }

  updateExamDescription(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<any>(Constant.API_UPDATE_EXAM_DESCRIPTION, formdata, {
      headers: head
    });
  }

  getExamById(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<any>(Constant.API_GET_EXAM_BY_ID + '/' + id, {
      headers: head
    });
  }
  getOneSubjectByIdExam(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Exam>(Constant.API_GET_ONE_SUBJECT_BY_ID_EXAM + id, {
      headers: head
    });
  }
  getListExamSetting(idExam) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object>(
      Constant.API_GET_EXAMSETTING_BY_EXAM + '/' + idExam,
      {
        headers: head
      }
    );
  }
  updateFileExam(formdata: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_FILE_EXAM, formdata, {
      headers: head
    });
  }
  updateUserExam(formdata: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_USER_EXAM, formdata, {
      headers: head
    });
  }
  importUserExam(formdata: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_IMPORT_USER_EXAM, formdata, {
      headers: head
    });
  }

  updateStatusExam(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_STATUS_EXAM, formData, {
      headers: head
    });
  }
  saveExamDetail(listQuestion, idExam) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Object>(
      Constant.API_ADD_EXAMQUESTION +
      '?listQuestion=' +
      listQuestion +
      '&examId=' +
      idExam,
      null,
      {
        headers: head
      }
    );
  }
  updateExamDetail(listQuestion, idExam, createType, listRandom) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Object>(
      Constant.API_UPDATE_EXAMQUESTION +
      '?listQuestion=' +
      listQuestion +
      '&examId=' +
      idExam +
      '&creatType=' +
      createType,
      listRandom,
      {
        headers: head
      }
    );
  }
  saveExamDetailRandom(
    idExam,
    idDomain,
    idChapter,
    percentageChapter,
    percentageDomain
  ) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Object>(
      Constant.API_ADD_EXAMQUESTIONRANDOM +
      '?examId=' +
      idExam +
      '&idDomain=' +
      idDomain +
      '&idChapter=' +
      idChapter +
      '&percentageChapter=' +
      percentageChapter +
      '&percentageDomain=' +
      percentageDomain,
      null,
      {
        headers: head
      }
    );
  }
  getListUserExam(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<any>(
      Constant.API_GET_LIST_USER_BY_EXAM_ID + '/' + id,
      {
        headers: head
      }
    );
  }
  getListGroupExam(id: number) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Group[]>(
      Constant.API_GET_LIST_GROUP_BY_EXAM_ID + '/' + id,
      {
        headers: head
      }
    );
  }
  getListQuestionExam(id: number) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_LIST_QUESTION_EXAM_ID + '/' + id,
      {
        headers: head
      }
    );
  }
  getExam(id: number): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Exam>(Constant.API_GET_EXAM_BY_ID + '/' + id, {
      headers: head
    });
  }
  getStartExam(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Number>(Constant.API_START_EXAM, formData, {
      headers: head
    });
  }
  getEndExam(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_EXAM_RESULT, formData, {
      headers: head
    });
  }

  insertExamAnswer(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_EXAMANSWER, formData, {
      headers: head
    });
  }
  updateExamAnswer(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_EXAMANSWER, formData, {
      headers: head
    });
  }
  deleteExamAnswer(formData: FormData) {
    return this.http.post(Constant.API_DELETE_EXAMANSWER, formData);
  }
  getListExamResult(idExam) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(Constant.API_GET_LIST_EXAMRESULT + idExam, {
      headers: head
    });
  }
  getExamReSultByExamAndId(idExamUser, idExam) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object>(
      Constant.API_GET_EXAMRESULT_BY_USER_EXAM +
      '?idExamUser=' +
      idExamUser +
      '&examId=' +
      idExam,
      {
        headers: head
      }
    );
  }
  getListQuestionResult(id: number) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_LIST_QUESTION_EXAM_BY_RESULT_ID + '/' + id,
      {
        headers: head
      }
    );
  }
  savePractiseExam(formData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Object>(Constant.API_ADD_EXAM_PRACTISE, formData, {
      headers: head
    });
  }

  // MR DUC
  getListExamResultByUserIDExamID(id1: number, id2: number) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_EXAMRESULT_BY_USER_ID_AND_EXAM_ID +
      '?userId=' +
      id1 +
      '&examId=' +
      id2,
      {
        headers: head
      }
    );
  }
  getListPracticeResultByUserIDPracticeID(id1: number, id2: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_PRACTICERESULT_BY_USER_ID_AND_PRARICE_ID +
      '?userId=' +
      id1 +
      '&practiceId=' +
      id2,
      {
        headers: head
      }
    );
  }
  updateCompleteExamResult(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_COMPLETE_RESULT, formData, {
      headers: head
    });
  }
  updateTimeExamResult(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_TIME_RESULT, formData, {
      headers: head
    });
  }
  search(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Object[]>(Constant.API_SEARCH_EXAM, formData, {
      headers: head
    });
  }
  getFreeTestResult(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Object[]>(
      Constant.API_GET_FREE_TEST_RESULT,
      formData,
      {
        headers: head
      }
    );
  }
  getListExamBySubjectId(subId: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_LIST_EXAM_BY_SUBJECT_ID +
      '/' +
      subId,
      {
        headers: head
      }
    );
  }

  //Linh
  getExamResultPractice(userid: number, subjectId: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.REST_API_GET_EXAM_RESULT_PRACTICE + '?userid=' + userid + '&subjectId=' + subjectId,
      {
        headers: head
      }
    );
  }

  getResultPractice(userid: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.REST_API_GET_RESULT_PRACTICE + userid,
      {
        headers: head
      }
    );
  }
  //thuy
  getExamResultByLesson(chapter_id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_EXAM_RESULT_BY_LESSON + '/' + chapter_id,
      {
        headers: head
      }
    );

  }
  getListQuestionExamDetail(examId: string, examUserId: string) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    let params = new HttpParams();
    params = params.append('examId', examId);
    params = params.append('examUserId', examUserId);
    return this.http.get<Object[]>(
      Constant.API_GET_LIST_QUESTION_EXAM_DETAIL,
      {
        headers: head,
        params: params
      }
    );
  }


  // trung
  ListExam(searchKey: string, type: string, exam_mode: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('searchKey', searchKey);
    params = params.append('type', type);
    params = params.append('exam_mode', exam_mode);
    head = head.set('TOKEN', 'Token' + tk);

    return this.http.get<Object[]>(Constant.API_GET_ALL_LIST_EXAM, {
      headers: head,
      params: params
    });
  }
  //end trung

  // minh anh
  ranDomOneExamBySubject(subId: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_RANDOM_ONE_EXAM + '/' + subId,
      {
        headers: head
      });
  }
  getNumAndSubjectById(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Exam>(Constant.API_GET_NUM_AND_SUBJECT_BY_ID + '/' + id, {
      headers: head
    });
  }

  insertExamRandom(formdata: FormData):Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_EXAM_SETTING, formdata, {
      headers: head,
      responseType: "text"
    });
  }

  addExamDemo(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_ADD_EXAM_DEMO, formdata, {
      headers: head
    });
  }

  //
  getExamByExamDemo() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Exam[]>(Constant.API_GET_ALL_EXAM_BY_EXAM_DEMO, {
      headers: head
    });
  }
  getExamByEntryTest() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Exam[]>(
      Constant.API_GET_ALL_EXAM_BY_ENTRY_TEST,
      {
        headers: head
      }
    );
  }
  getExamByExamUser() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Exam[]>(
      Constant.API_GET_ALL_EXAM_BY_EXAM_USER,
      {
        headers: head
      }
    );
  }
  getExamByExamOften() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Exam[]>(
      Constant.API_GET_ALL_EXAM_BY_EXAM_OFTEN,
      {
        headers: head
      }
    );
  }
  getPractice(userId: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_ALL_PRACTICE + userId,
      {
        headers: head
      }
    );
  }
  getExamUserByExamId(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<any>(Constant.API_GET_USER_EXAM_BY_EXAM_ID + '/' + id, {
      headers: head
    });
  }
  getListExamUserByExamID(completed: number, id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<ExamUser[]>(
      Constant.API_EXAM_USER_BY_USER_ID_AND_EXAM_ID + completed + '/exam/' + id,
      {
        headers: head
      }
    );
  }
  getListExamUserCompletedExamID(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<ExamUser[]>(
      Constant.API_EXAM_USER_BY_COMPLETED_AND_EXAM_ID + '/' + id,
      {
        headers: head
      }
    );
  }
  getExamsById(examId: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Exam>(Constant.API_GET_EXAM_BY_ID_AND_USER_ID + '/' + examId , {
      headers: head
    });
  }
  getCountExamUserFinish(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<number>(Constant.API_GET_COUNT_EXAM_USER_FINISH + '/' + id, {
      headers: head
    });
  }
  getCountExamUserUnfinish(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<number>(Constant.API_GET_COUNT_EXAM_USER_UNFINISH + '/' + id, {
      headers: head
    });
  }
  export(examId: number): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get(Constant.API_EXPORT_FILE + '/' + examId  , {
      headers: head,
      responseType: 'blob' as 'json'
    })

  }
  getChaptersNameByExamId(examId: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<String[]>(
      Constant.API_GET_CHAPTERS_NAME_BY_EXAM_ID + '/' + examId,
      {
        headers: head
      }
    );
  }
  getDomainsNameByExamId(examId: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<String[]>(
      Constant.API_GET_DOMAINS_NAME_BY_EXAM_ID + '/' + examId,
      {
        headers: head
      }
    );
  }
  getExamSettingByExamId(examId) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<ExamSetting[]>(
      Constant.API_GET_EXAMSETTING_BY_EXAMID + '/' + examId,
      {
        headers: head
      }
    );
  }
  getRestUser(examId){
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_REST_USER + '/' + examId, {
        headers: head
      }
    );
  }
    
  getExamComingSoon(userid: number){
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Exam[]>(
      Constant.REST_API_GET_EXAM_COMING_SOON + userid,
      {
        headers: head
      }
    );
  }
}
