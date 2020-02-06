import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/common/constant';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
   baseURL = '';
  constructor( ) { }

  ngOnInit() {
    this.baseURL = Constant.BASE_URL+"/resources/book/book.pdf";
  }

  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }
}
