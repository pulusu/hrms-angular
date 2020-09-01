import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Angular 8 components */
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentsListComponent } from './components/students-list/students-list.component';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* Angular 8 http service */
import { HttpClientModule } from '@angular/common/http';

/* Angular 8 CRUD services */
import { ApiService } from './shared/api.service';
/* file upload */
import { FileSelectDirective } from 'ng2-file-upload';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

/* Material design */

import { MatProgressSpinnerModule } from '@angular/material';
import { MatCardModule, MatSelectModule,  MatAutocompleteModule ,MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE ,MAT_DATE_FORMATS } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material'
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';



/* Reactive form services in Angular 8 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { LoginComponent } from './components/login/login.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';
import { ComponentNameComponent } from './component-name/component-name.component';
import { HolidaysListComponent } from './components/holidays-list/holidays-list.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { DepartmentsListComponent } from './components/departments-list/departments-list.component';
import { EmpLeaveRequestsComponent } from './components/emp-leave-requests/emp-leave-requests.component';
import { HrSocialMediaComponent } from './components/hr-social-media/hr-social-media.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { EventsComponent } from './components/events/events.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { DepartmentEditComponent } from './components/department-edit/department-edit.component';
import { DepartmentAddComponent } from './components/department-add/department-add.component';
import { EmployeesAddComponent } from './components/employees-add/employees-add.component';
import { LeaveRequestAddComponent } from './components/leave-request-add/leave-request-add.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamAddComponent } from './components/team-add/team-add.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { TeamAddMemberComponent } from './components/team-add-member/team-add-member.component';
import { AddRunsComponent } from './components/add-runs/add-runs.component';
import { TeamMemberDetailsComponent } from './components/team-member-details/team-member-details.component';
import { EmployeeDataAddComponent } from './components/employee-data-add/employee-data-add.component';
import { EmployeeDataListComponent } from './components/employee-data-list/employee-data-list.component';
import { EmpDataEditComponent } from './components/emp-data-edit/emp-data-edit.component';
import { EmpScoreEditComponent } from './components/emp-score-edit/emp-score-edit.component';
import { SocialMediaLinksComponent } from './components/social-media-links/social-media-links.component';


@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentComponent,
    StudentsListComponent,
    AddClientComponent,
    EditClientComponent,
    ClientsListComponent,
    FileSelectDirective,
    AddUserComponent,
    EditUserComponent,
    UsersListComponent,
    LoginComponent,
    AddProfileComponent,
    EditProfileComponent,
    ProfilesListComponent,
    ComponentNameComponent,
    HolidaysListComponent,
    EmployeesListComponent,
    DepartmentsListComponent,
    EmpLeaveRequestsComponent,
    HrSocialMediaComponent,
    DashboardComponent,
    LeftSidebarComponent,
    ActivitiesComponent,
    EventsComponent,
    EmployeeEditComponent,
    DepartmentEditComponent,
    DepartmentAddComponent,
    EmployeesAddComponent,
    LeaveRequestAddComponent,
	StepperComponent,
	TeamsComponent,
	TeamAddComponent,
	TeamDetailsComponent,
	TeamAddMemberComponent,
	AddRunsComponent,
	TeamMemberDetailsComponent,
	EmployeeDataAddComponent,
	EmployeeDataListComponent,
	EmpDataEditComponent,
	EmpScoreEditComponent,
	SocialMediaLinksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
	MatMomentDateModule,
    MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatSortModule,
		MatTableModule,
		MatToolbarModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatCardModule,
		MatSelectModule,
		MatAutocompleteModule,
		MatDatepickerModule,
	    MatStepperModule,
    MatNativeDateModule,
    Ng2SearchPipeModule, 
    Ng2OrderModule, 
    NgxPaginationModule
    ],
  providers: [ApiService,
  {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }