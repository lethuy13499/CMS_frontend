import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-information-popup',
  templateUrl: './information-popup.component.html',
  styleUrls: ['./information-popup.component.scss']
})
export class InformationPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InformationPopupComponent>) { }
  code="";
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
