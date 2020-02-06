import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncateModule } from 'ng2-truncate';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorModule,
  MatTableModule,
  MatSortModule
} from '@angular/material';
import { AuthGuardService as AuthGuard } from 'src/app/service/guards/authguards.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PopupModule } from 'ng2-opd-popup';

import { DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { PageNotFoundComponent } from '../../user/page-not-found/page-not-found.component';

import { ConfirmationGuard } from 'src/app/service/exam-guard/confirmation/confirmation.guard';

import { TooltipModule } from 'ng2-tooltip-directive';
import { ExamDetailsComponent } from '../exam-details/exam-details.component';
import { ExamDescriptionComponent } from '../exam-details/exam-description/exam-description.component';

import { RoleGuards } from 'src/app/service/guards/roleguards.service';
import { ExamOverviewComponent } from '../exam-details/exam-overview/exam-overview.component';
import { ExamUsersComponent } from './exam-users/exam-users.component';


const routes: Routes = [
  {
    path: 'exam/details',
    children: [

      {
        path: 'overview',
        component: ExamOverviewComponent
      },
      {
        path: 'description',
        component: ExamDescriptionComponent
      }
      // {
      //   path: '**',
      //   component: PageNotFoundComponent
      // }
    ]
  }
];
@NgModule({
  declarations: [
    ExamDescriptionComponent,
    ExamOverviewComponent,
    ExamUsersComponent
  ],
  imports: [

    RouterModule.forChild(routes),

  ],
  providers: [RoleGuards, DatePipe, ConfirmationGuard]
})
export class ExamDetailsModule { }
