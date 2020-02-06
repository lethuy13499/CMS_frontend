import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { PermissionComponent } from '../permission/permission.component';
import { SlidebarComponent } from '../slidebar/slidebar.component';
import { CmsComponent } from './cms.component';
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
import { UserComponent } from '../user/user.component';
import { RoleComponent } from '../role/role.component';
import { ViewnewslistComponent } from '../news/viewnewslist/viewnewslist.component';
import { CreatenewComponent } from '../news/createnew/createnew.component';
import { UpdatenewsComponent } from '../news/updatenews/updatenews.component';
import { MatrixRoleMenuComponent } from '../role_menu/matrix-role-menu.component';
import { MatrixRolePermistionComponent } from '../role_permission/matrix-role-permistion.component';
import { MatrixUsersRoleComponent } from '../role_user/matrix-users-role.component';
import { UserTestDashboardComponent } from '../user-test-dashboard/user-test-dashboard.component';
import { SubjectComponent } from '../subject/subject.component';
import { ChapterComponent } from '../chapter/chapter.component';
import { GroupComponent } from '../group/group.component';
import { DomainComponent } from '../domain/domain.component';
import { CreatequestionComponent } from '../question/create-question/createquestion.component';
import { UpdateQuestionComponent } from '../question/update-question/update-question.component';
import { ExamComponent } from '../exam/exam.component';
import { DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CustomerComponent } from '../customer/customer/customer.component';
import { PageNotFoundComponent } from '../../user/page-not-found/page-not-found.component';
import { ChangePasswordComponent } from '../../user/change-password/change-password.component';
import { ExamDetailAdminComponent } from '../exam-detail-admin/exam-detail-admin.component';
import { EditProfileComponent } from '../../user/edit-profile/edit-profile.component';
import { ExamDetailComponent } from '../exam/exam-detail/exam-detail.component';
import { ProfileUserComponent } from '../../user/profile-user/profile-user.component';
import { RoleGuards } from 'src/app/service/guards/roleguards.service';
import { ConfirmationGuard } from 'src/app/service/exam-guard/confirmation/confirmation.guard';
import { ListquestionComponent } from '../question/list-question/listquestion.component';
import { ProfileComponent } from '../profile/profile.component';
import { ProductComponent } from '../product/product.component';
import { RegistrantionComponent } from '../registrantion/registrantion.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ClassDetailComponent } from '../class/class-detail/class-detail.component';
import { SubjectDetailComponent } from '../subject/subject detail/subject-detail/subject-detail.component';
import { CreateUnitComponent } from '../lesson-content/create-unit/create-unit.component';
import { SubjectOutlineComponent } from '../subject/subject-outline/subject-outline.component';
import { UpdateUnitComponent } from '../lesson-content/update-unit/update-unit.component';
import { CreateChaptersComponent } from '../section-details/create-chapters/create-chapters.component';

import { TraineeAssignmentsComponent } from '../trainee-assignments/trainee-assignments.component';
import { ClassListComponent } from '../class/class-list/class-list.component';
import { ChapterLessonComponent } from '../chapter-lesson/chapter-lesson/chapter-lesson.component';
import { ChapterLessonDetailsComponent } from '../chapter-lesson/chapter-lesson-details/chapter-lesson-details.component';
import { TraineeQuizComponent } from '../trainee-quiz/trainee-quiz.component';

import { TooltipModule } from 'ng2-tooltip-directive';
import { ExamDetailsComponent } from '../exam-details/exam-details.component';
import { ExamDescriptionComponent } from '../exam-details/exam-description/exam-description.component';
import { ExamOverviewComponent } from '../exam-details/exam-overview/exam-overview.component';
import { ExamUsersComponent } from '../exam-details/exam-users/exam-users.component';
import { RandomQuestionComponent } from '../exam-details/random-question/random-question.component';
import { SelectedQuestionComponent } from '../exam-details/selected-question/selected-question.component';
import { ListUserGroupComponent } from '../group/list_user_group/list_user_group.component';
import { ExamHistoryComponent } from '../../user/exam-history/exam-history.component';
import { ExamUserHistoryComponent } from '../exam-user-history/exam-user-history.component';
import { WelfareComponent } from '../welfare/welfare.component';
import { JobComponent } from '../job/job.component';
import { EbookComponent } from '../ebook/ebook.component';
import { CvComponent } from '../cv/cv.component';
// import { EbookComponent } from '../ebook/ebook.component';






const routes: Routes = [
  {
    path: 'cms',
    component: CmsComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: 'exam/details',
        component: ExamDetailsComponent,
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full'
          },
          {
            path: 'overview',
            component: ExamOverviewComponent
          },
          {
            path: 'description',
            component: ExamDescriptionComponent
          },
          {
            path: 'random',
            component: RandomQuestionComponent
          },
          {
            path: 'selected',
            component: SelectedQuestionComponent
          },
          {
            path: 'user_exam',
            component: ExamUsersComponent
          }
        ]
      },
      {
        path: 'exam/details/:id',
        component: ExamDetailsComponent,
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full'
          },
          {
            path: 'description',
            component: ExamDescriptionComponent
          },
          {
            path: 'overview',
            component: ExamOverviewComponent
          },
          {
            path: 'random',
            component: RandomQuestionComponent
          },
          {
            path: 'selected',
            component: SelectedQuestionComponent
          },
          {
            path: 'user_exam',
            component: ExamUsersComponent
          }
        ]
      },
      {
        path: 'class',
        component: ClassListComponent
      },
      {
        path: 'slidebar',
        component: SlidebarComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'permission',
        component: PermissionComponent
      },
      {
        path: 'viewnewslist',
        component: ViewnewslistComponent
      },
      {
        path: 'createnew',
        component: CreatenewComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: 'updatenew',
        component: UpdatenewsComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: 'rolemenu',
        component: MatrixRoleMenuComponent
      },
      {
        path: 'rolepermission',
        component: MatrixRolePermistionComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'role',
        component: RoleComponent,
        canActivate: [RoleGuards]
      },
      {
        path: 'examdetail',
        component: ExamDetailComponent
      },
      {
        path: 'examdetail/:p1/:p2',
        component: ExamDetailComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'profile/:email',
        component: ProfileComponent
      },
      {
        path: 'usersrole',
        component: MatrixUsersRoleComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
        // component: UserTestDashboardComponent
      },
      {
        path: 'examdashboard',
        component: UserTestDashboardComponent
      },
      {
        path: 'dashboard/:param1/:param2',
        component: UserTestDashboardComponent
      },
      {
        path: 'subject',
        component: SubjectComponent
      },
      {
        path: 'subject/:id',
        component: SubjectDetailComponent
      },

      {
        path: 'chapter',
        component: ChapterComponent
      },
      {
        path: 'domain',
        component: DomainComponent
      },
      {
        path: 'group',
        component: GroupComponent
      },
      {
        path: 'listquestion',
        component: ListquestionComponent
      },
      {
        path: 'group/listuser/:id',
        component: ListUserGroupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'createquestion',
        component: CreatequestionComponent
      },
      {
        path: 'updatequestion/:id',
        component: UpdateQuestionComponent
      },
      {
        path: 'exam',
        component: ExamComponent
      },
      {
        path: 'examresult:/idExam',
        component: UserTestDashboardComponent
      },
      {
        path: 'examdetail/:data',
        component: ExamDetailComponent
      },
      {
        path: 'examdetailadmin/:idExam',
        component: ExamDetailAdminComponent
      },
      {
        path: 'group',
        component: GroupComponent
      },
      {
        path: 'customer',
        component: CustomerComponent
      },
      {
        path: 'class/detail/:id',
        component: ClassDetailComponent
      },
      {
        path: 'changepassword',
        component: ChangePasswordComponent
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent
      },
      {
        path: 'registrantions',
        component: RegistrantionComponent
      },
      {
        path: 'sliderbar',
        component: SlidebarComponent
      },
      {
        path: 'trainee',
        component: TraineeQuizComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'createunit/:subjectId/:chapterId',
        component: CreateUnitComponent
      },
      {
        path: 'editunit/:subjectId/:chapterId',
        component: UpdateUnitComponent
      },
      {
        path: 'subject-outline/:subjectId',
        component: SubjectOutlineComponent
      },
      {
        path: 'create-chapters',
        component: CreateChaptersComponent
      },
      {
        path: 'traineeassignments/:id',
        component: TraineeAssignmentsComponent
      },
      {
        path: 'chapter-lesson',
        component: ChapterLessonComponent
      },
      {
        path: 'chapter-lesson/:id',
        component: ChapterLessonDetailsComponent
      },
      {
        path: 'examhistory/:id',
        component: ExamUserHistoryComponent
      },
      //module bổ sung
      {
        path:'welfare',
        component:WelfareComponent
      },
      {
        path:'ebook',
        component:EbookComponent
      },
      {
        path:'job',
        component:JobComponent
      },
      {
        path:'cv',
        component:CvComponent
      },
     
      {
        path: '',
        redirectTo: '/cms/dashboard',
        pathMatch: 'full'
      },
     

   
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];
@NgModule({
  declarations: [
    ExamDescriptionComponent,
    ExamOverviewComponent,
    ExamDetailsComponent,
    MenuComponent,
    PermissionComponent,
    SlidebarComponent,
    CmsComponent,
    UpdatenewsComponent,
    ViewnewslistComponent,
    CreatenewComponent,
    MatrixRolePermistionComponent,
    MatrixRoleMenuComponent,
    RoleComponent,
    UserComponent,
    SubjectComponent,
    DomainComponent,
    ChapterComponent,
    GroupComponent,
    ListquestionComponent,
    CreatequestionComponent,
    UpdateQuestionComponent,
    MatrixRoleMenuComponent,
    MatrixUsersRoleComponent,
    UserTestDashboardComponent,
    ExamComponent,
    ExamDetailComponent,
    CustomerComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    ProfileUserComponent,
    ListquestionComponent,
    ProductComponent,
    DashboardComponent,
    CreateUnitComponent,
    UpdateUnitComponent,
    TraineeAssignmentsComponent,
    ClassListComponent,
    ChapterLessonComponent,
    RandomQuestionComponent,
    SelectedQuestionComponent,
    ListUserGroupComponent,
    WelfareComponent,
    JobComponent,
    EbookComponent,
    CvComponent

  ],
  imports: [

    TooltipModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    TruncateModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    }),
    NgxPaginationModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    AngularEditorModule,
    HttpModule,
    HttpClientModule,
    PopupModule.forRoot(),
    DragDropModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [RoleGuards, DatePipe, ConfirmationGuard]
})
export class CmsModule { }
