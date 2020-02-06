import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constant } from '../../common/constant';
import { TraineeAssignment } from 'src/app/model/trainee_assignment/traineeassignment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraineeAssignmentService {
  handleError: any;
  constructor(private http: HttpClient) {
  }

  getTraineeAssignmentsByClassId(classId: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<TraineeAssignment[]>(Constant.API_GET_ALL_TRAINEEASSIGNMENT + '/' + classId, {
      headers: head
    });
  }

  getClassByAssignmentId(classId: number, traineeassignmentId: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<TraineeAssignment>(Constant.API_GET_LIST_TRAINEEASSIGNMENT_BY_ClassLesson_ID + '/' + classId + '/' + traineeassignmentId, {
      headers: head
    });
  }
  updateTrainee(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_TRAINEEASSIGNMENT_UPDATE, formdata, {
      headers: head
    });
  }

  getListAssignmentBySeach(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<TraineeAssignment[]>(Constant.API_TRAINEEASSIGNMENT_SEARCH, formData, {
      headers: head
    });
  }
  downloadAssigment(id) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get(Constant.BASE_URL + '/traineeAssignment/' + id + '/assigment', {
      headers: head,
      responseType: 'blob'
    })
  }

}
