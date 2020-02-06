import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PopupModule } from 'ng2-opd-popup';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Http } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { MatDialogModule } from '@angular/material/dialog';

import {
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  MatTreeModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';
import { TOKEN_NAME } from './common/auth.constant';
import { AuthGuardServiceToken } from './service/guards/authguardtoken.service';
import { HometotalModule } from './component/user/hometotal/hometoal.moudule';
import { AuthenticationService } from './service/login/authentication.service';
import { UserService } from './service/login/user.service';
import { AuthGuardService } from './service/guards/authguards.service';
import { AuthService } from './service/guards/auth.service';
import { DataService } from './service/dataservice/dataservice.service';
import { TruncateModule } from 'ng2-truncate';
import { CheckRolePermissionOrMenu } from './common/checkRolePermissionOrMenu';
import { HometotalComponent } from './component/user/hometotal/hometotal.component';
import { PagenewsModule } from './component/user/news_session/pagenews/pagenews.moudule';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PageNotFoundComponent } from './component/user/page-not-found/page-not-found.component';
import { ContactUsComponent } from './component/user/contact-us/contact-us.component';
import { PracticeComponent } from './component/user/practice/practice.component';
import { UserExamComponent } from './component/user/user-exam/user-exam.component';
import { ExamHistoryComponent } from './component/user/exam-history/exam-history.component';
import { PracticeAddComponent } from './component/user/practice/practice-add/practice-add.component';
import { ExamDetailAdminComponent } from './component/admin/exam-detail-admin/exam-detail-admin.component';
import { ActiveForgotComponent } from './component/user/active-forgot/active-forgot.component';
import { TestresultComponent } from './component/user/testresult/testresult.component';
import { PopupComponent } from './component/admin/question/list-question/popup/popup.component';
import { SharedModule } from './common/shared.module';
import { RoleGuards } from './service/guards/roleguards.service';
import { TooltipModule } from 'ngx-bootstrap';
import { ProfileComponent } from './component/admin/profile/profile.component';
import { CmsModule } from './component/admin/cms/cms.module';
import { LoginComponent } from './component/user/login/login.component';
import { ErrorPageComponent } from './component/user/error_page/error-page/error-page.component';
import { RegistrantionComponent } from './component/admin/registrantion/registrantion.component';
import { ProductComponent } from './component/admin/product/product.component';
import { MenuClientComponent } from './component/user/menu-client/menu-client.component';
import { ProductHomeComponent } from './component/user/product-home/product-home.component';
import { ProductCatalogComponent } from './component/user/product-home/product-catalog/product-catalog.component';
import { ProductDetailComponent } from './component/user/product-home/product-detail/product-detail.component';
import { BookComponent } from './component/user/book/book.component';
import { NotifierModule } from 'angular-notifier';
import { ClassDetailComponent } from './component/admin/class/class-detail/class-detail.component';
import { SubjectDetailComponent } from './component/admin/subject/subject detail/subject-detail/subject-detail.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SubjectOutlineComponent } from './component/admin/subject/subject-outline/subject-outline.component';
import { CreateChaptersComponent } from './component/admin/section-details/create-chapters/create-chapters.component';
import { ChapterLessonDetailsComponent } from './component/admin/chapter-lesson/chapter-lesson-details/chapter-lesson-details.component';
import { CreateSectionComponent } from './component/admin/section-details/create-section/create-section.component';
import { TraineeQuizComponent } from './component/admin/trainee-quiz/trainee-quiz.component';
import {ExamUsersComponent} from './component/admin/exam-details/exam-users/exam-users.component';

import {TabsModule} from 'ngx-tabset';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExamDemoComponent } from './component/user/exam-demo/exam-demo.component';
import { FullExamComponent } from './component/user/full-exam/full-exam.component';
import { InformationPopupComponent } from './component/user/home/information-popup/information-popup.component';
import { ExamUserHistoryComponent } from './component/admin/exam-user-history/exam-user-history.component';





export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(
    new AuthConfig({
      headerPrefix: 'Bearer',
      tokenName: TOKEN_NAME,
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noJwtError: false,
      noTokenScheme: true,
      tokenGetter: () => localStorage.getItem(TOKEN_NAME)
    }),
    http
  );
}
export function tokenGetter() {
  return localStorage.getItem('access_token');
}
const routes: Routes = [
  {
    path: 'hometotal',
    component: HometotalComponent
  },
  {
    path: 'error-page',
    component: ErrorPageComponent
  },
  {
    path: '',
    redirectTo: '/hometotal/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: LoginComponent
  }
];
@NgModule({
  exports: [

    MatTooltipModule,
  ],
  entryComponents: [PopupComponent,InformationPopupComponent],
  declarations: [
    AppComponent,
    HometotalComponent,
    PageNotFoundComponent,
    ContactUsComponent,
    PracticeComponent,
    UserExamComponent,
    ExamHistoryComponent,
    PracticeAddComponent,
    ExamDetailAdminComponent,
    ActiveForgotComponent,
    TestresultComponent,
    PopupComponent,
    ProfileComponent,
    ErrorPageComponent,
    RegistrantionComponent,
    // ProductComponent,
    MenuClientComponent,
    ProductHomeComponent,
    ProductCatalogComponent,
    ProductDetailComponent,
    BookComponent,
    ClassDetailComponent,
    SubjectDetailComponent,
    SubjectOutlineComponent,
    CreateChaptersComponent,
    ChapterLessonDetailsComponent,
    CreateSectionComponent,
    TraineeQuizComponent,
    ExamUsersComponent,
    ExamDemoComponent,
    FullExamComponent,
    InformationPopupComponent,
    ExamUserHistoryComponent,

  
   

  ],
  imports: [
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    CmsModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['example.com'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    }),
    NgxPaginationModule,
    PopupModule,
    MatPaginatorModule,
    MatTreeModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    DragDropModule,
    MatSortModule,
    NgMultiSelectDropDownModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    TruncateModule,
    HometotalModule,
    PagenewsModule,
    MatDialogModule,
    PdfViewerModule,
    AngularEditorModule,
    SharedModule.forRoot(),
    NotifierModule.withConfig({
      position: {
        horizontal: {
          /*
           //* Defines the horizontal position on the screen
           * @type {'left' | 'middle' | 'right'}
           */
          position: 'right',

          /**
           * Defines the horizontal distance to the screen edge (in px)
           //* @type {number}
           */
          distance: 25
        },

        vertical: {
          /**
           * Defines the vertical position on the screen
           //* @type {'top' | 'bottom'}
           */
          position: 'top',

          /**
           * Defines the vertical distance to the screen edge (in px)
           // * @type {number}
           */
          distance: 50,

          /**
           * Defines the vertical gap, existing between multiple notifications (in px)
           //* @type {number}
           */
          gap: 10
        }
      },
      behaviour: {
        /**
         * Defines whether each notification will hide itself automatically after a timeout passes
         //* @type {number | false}
         */
        autoHide: 3000,

        /**
         * Defines what happens when someone clicks on a notification
         //* @type {'hide' | false}
         */
        onClick: 'hide',

        /**
         * Defines what happens when someone hovers over a notification
         //* @type {'pauseAutoHide' | 'resetAutoHide' | false}
         */
        onMouseover: 'pauseAutoHide',

        /**
         * Defines whether the dismiss button is visible or not
         //* @type {boolean}
         */
        showDismissButton: true,

        /**
         * Defines whether multiple notification will be stacked, and how high the stack limit is
         //* @type {number | false}
         */
        stacking: 4
      }
    })

  ],
  providers: [
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http] },
    AuthenticationService,
    UserService,
    JwtHelperService,
    AuthGuardService,
    AuthGuardServiceToken,
    AuthService,
    DataService,
    RoleGuards,
    CheckRolePermissionOrMenu,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
