import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewpostService } from 'src/app/service/newpost/newpost.service';
import { Constant } from 'src/app/common/constant';
@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.scss']
})
export class TintucComponent implements OnInit {
  perPage = 5;
  listPagenewsNews: Object[] = [];
  ex: Object;
  baseURL = '';
  constructor(
    private router: Router,
    private newpostService: NewpostService,
  ) { }
  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    // Get list pagenews news
    this.newpostService.getListPinnedNews().subscribe(res => {
      this.listPagenewsNews = res;
    
    });
  }
  onViews(e) {
    this.router.navigate(['hometotal/pagenews/news/viewnews/' + e]);
  }
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
}
