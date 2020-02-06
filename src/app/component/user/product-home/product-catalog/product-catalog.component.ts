import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Product } from 'src/app/model/product/product';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product/product.service';
import { Constant } from 'src/app/common/constant';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {
  tit: string;
  products: Product[] = [];
  perPage = 8;
  showTable: Boolean = true;
  baseURL = '';
  constructor(private activatedRoute: ActivatedRoute, private titleService: Title, private productService: ProductService) { }

  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    this.titleService.setTitle('Testonline System - Product');
    this.loadProducts();
  }
  loadProducts() {
    this.activatedRoute.paramMap.pipe(
      mergeMap(params => {
        const contentType = params.get('contentType');
        this.tit = contentType;
        return this.productService.getListProductByContentType(contentType);
      })
    ).subscribe(pd => {
      this.products = pd;

    });
  }

  onChange(event) {
    this.perPage = event.target.value;
  }
}
