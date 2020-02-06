import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constant } from 'src/app/common/constant';
import { Product } from 'src/app/model/product/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getlistProduct() {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Product[]>(Constant.API_LIST_PRODUCT, {
      headers: head
    });
  }

  createProduct(formdata: FormData){
  const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_CREATE_PRODUCT, formdata, {
      headers: head
    });
  }
  editProduct(formdata: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_EDIT_PRODUCT, formdata, {
      headers: head
    });
  }
  deleteProduct(id: number) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.delete(Constant.API_DELETE_PRODUCT + "/" + id, {
      headers: head
    });
  }
  searchProduct(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Product[]>(Constant.API_SEARCH_PRODUCT, formdata, {
      headers: head
    });
  }
  getProductType(): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Product[]>(Constant.API_LIST_PRODUCT_BY_TYPE, {
      headers: head
    });
  }
  //hung
  getProductById(id: number): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get(Constant.API_GET_PRODUCT_BY_ID + `/${id}`, {
      headers: head
    });
  }

  getListProductByContentType(contentType: string): Observable<any> {
      const tk = localStorage.getItem('access_token');
      let head = new HttpHeaders();
      head = head.set('TOKEN', 'Token' + tk);
      return this.http.get(Constant.API_GET_LIST_PRODUCT_BY_CONTENTTYPE + `/${contentType}`, {
          headers: head
      });
  };

  // nmanh
  searchcontent(formData: FormData) {
    
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Product[]>(Constant.API_SEARCH_PRODUCTCONTENT, formData, {
      headers: head
    });
  }
}

