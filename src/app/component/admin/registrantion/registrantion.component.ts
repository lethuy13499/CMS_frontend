import { Component, OnInit } from '@angular/core';
import { Registrantion } from 'src/app/model/registrantion';
import { RegistrantionService } from 'src/app/service/registrantion/registrantion.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Sort } from 'src/app/model/sort';

@Component({
  selector: 'app-registrantion',
  templateUrl: './registrantion.component.html',
  styleUrls: ['./registrantion.component.scss']
})
export class RegistrantionComponent implements OnInit {
  registrantions: Registrantion[] = [];
  perPage = 5;
  showTable: Boolean = true;
  status: number;
  registrantion: Registrantion = new Registrantion();
  registrantionFrom: FormGroup;
  sort: Sort = new Sort('',true, '')
  private booleanSort: boolean = true;
  constructor(private registrantionService: RegistrantionService,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.getList();
    this.registrantionFrom = this.fromBuilder.group({
      registrantionId: [''],
      status: [''],

    });
  }
  getList() {
    this.registrantionService.getListRegistrantion(this.sort).subscribe((registrantions: Registrantion[]) => {
      this.registrantions = registrantions;
    });
  }

  onChange(event) {
    this.perPage = event.target.value;
  }

  updateStatus(registrantionId, status) {
    if (status === 1) {
      status = 0;
    } else {
      status = 1;
    }
    this.registrantionService.update(registrantionId, status).subscribe(
      pip => this.getList()
    )
  }
  getValue(value) {
    var sort = new Sort('', true, value);
    this.registrantionService.getListRegistrantion(sort).subscribe((registrantions: Registrantion[]) => {
      this.registrantions = registrantions;
    });

  }
  clickSort(value, sort) {
    if (this.booleanSort) {
      this.booleanSort = false;
    } else {
      this.booleanSort = true;
    }
    var sortResult = sort;
    sortResult.sortName = value;
    sortResult.sort = this.booleanSort;
    
    this.registrantionService.getListRegistrantion(sortResult).subscribe((registrantions: Registrantion[]) => {
      this.registrantions = registrantions;

    });


  }
  getRegistrantion(registrantionId: number) {
    
    this.registrantionService.getRegistrantionById(registrantionId).subscribe(data => {
      this.registrantion = data;
      
    });
  }

}

