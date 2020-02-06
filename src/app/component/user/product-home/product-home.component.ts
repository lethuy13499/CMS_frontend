import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product/product';
import { Title } from '@angular/platform-browser';
import { ProductService } from 'src/app/service/product/product.service';
import { Constant } from 'src/app/common/constant';
import { ActivatedRoute } from '@angular/router';
import { Viewnewslist } from 'src/app/model/viewnewslist/viewnewslist';
import { ViewnewslistService } from 'src/app/service/viewnewslist/viewnewslist.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {
  listProduct: Object[] = [];
  products: Product[] = [];
  productCourse: Product[] = [];
  productExam: Product[] = [];
  productBook: Product[] = [];
  news: Viewnewslist[] = [];
  perPage = 8;
  showTable: Boolean = true;
  baseURL = '';
  product: Product;
  key: string;

  constructor(private titleService: Title, private productService: ProductService,
    private activatedRoute: ActivatedRoute, private newService: ViewnewslistService,

  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.key = params['search'];
      this.loadProducts();
    });
  }

  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    this.titleService.setTitle('Testonline System - Product');
  }

  loadProducts() {
    this.products = [];
    this.productCourse = [];
    this.productExam = [];
    this.productBook = [];
    this.news = [];
    if (this.key === undefined) {
      this.productService.getlistProduct().subscribe(pd => {
        this.products = pd;
        this.products.forEach(Product => {
          if ("Khóa học" === Product.contentType) {
            this.productCourse.push(Product);
          }
          if ("Kì Thi" === Product.contentType) {
            this.productExam.push(Product);
          }
          if ("Book" === Product.contentType) {
            this.productBook.push(Product);
          }
        })
      });
    } else {
      const body = {
        key: this.key,
        type: 'search'
      };
      const formData = new FormData();
      formData.append('data', JSON.stringify(body));
      this.productService.searchcontent(formData).subscribe(res => {
        this.products = res;
        this.products.forEach(Product => {
          if ("Khóa học" === Product.contentType) {
            this.productCourse.push(Product);
          }
          if ("Kì Thi" === Product.contentType) {
            this.productExam.push(Product);
          }
          if ("Book" === Product.contentType) {
            this.productBook.push(Product);
          }
        });
      })

      //search new
      this.newService.searchProductNews(this.key).subscribe(res => {
        this.news = res;
        
      })
    }
  }
}