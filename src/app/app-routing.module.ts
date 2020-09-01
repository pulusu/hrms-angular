import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
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
import { HolidaysListComponent } from './components/holidays-list/holidays-list.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { DepartmentsListComponent } from './components/departments-list/departments-list.component';
import { EmpLeaveRequestsComponent } from './components/emp-leave-requests/emp-leave-requests.component';
import { HrSocialMediaComponent } from './components/hr-social-media/hr-social-media.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { EventsComponent } from './components/events/events.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { DepartmentAddComponent } from './components/department-add/department-add.component';
import { DepartmentEditComponent } from './components/department-edit/department-edit.component';
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



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'team-list' , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'add-profile', component: AddProfileComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent },
  { path: 'profiles-list', component: ProfilesListComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'edit-student/:id', component: EditStudentComponent },
  { path: 'students-list', component: StudentsListComponent },
  { path: 'add-client', component: AddClientComponent },
  { path: 'edit-client/:id', component: EditClientComponent },
  { path: 'clients-list', component: ClientsListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'users', component: UsersListComponent },
  /* New components */
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'holidays', component: HolidaysListComponent , canActivate: [AuthGuard]},
  { path: 'employees-list', component: EmployeesListComponent , canActivate: [AuthGuard]},
  { path: 'edit-employee/:id', component: EmployeeEditComponent , canActivate: [AuthGuard]},
  { path: 'departments', component: DepartmentsListComponent , canActivate: [AuthGuard]},
  { path: 'department-add', component: DepartmentAddComponent , canActivate: [AuthGuard]},
  { path: 'employee-add', component: EmployeesAddComponent , canActivate: [AuthGuard]},
  { path: 'edit-department/:id', component: DepartmentEditComponent , canActivate: [AuthGuard]},
  { path: 'emp-leave-requests', component: EmpLeaveRequestsComponent , canActivate: [AuthGuard]},
  { path: 'leave-request', component: LeaveRequestAddComponent , canActivate: [AuthGuard]},
  { path: 'activities', component: ActivitiesComponent , canActivate: [AuthGuard]},
  { path: 'hr-social-media', component: HrSocialMediaComponent , canActivate: [AuthGuard]},
  { path: 'events', component: EventsComponent , canActivate: [AuthGuard]},
  { path: 'stepper', component: StepperComponent , canActivate: [AuthGuard]},
  { path: 'teams-list', component: TeamsComponent , canActivate: [AuthGuard]},
  { path: 'team-add', component: TeamAddComponent , canActivate: [AuthGuard]},
  { path: 'team-details/:id', component: TeamDetailsComponent , canActivate: [AuthGuard]},
  { path: 'team-member-details/:id/:id', component: TeamMemberDetailsComponent , canActivate: [AuthGuard]},
  { path: 'team-member-add/:id', component: TeamAddMemberComponent , canActivate: [AuthGuard]},
  { path: 'team-member-add-runs', component: AddRunsComponent , canActivate: [AuthGuard]},
  { path: 'emp-data-add', component: EmployeeDataAddComponent , canActivate: [AuthGuard]},
  { path: 'emp-data-list', component: EmployeeDataListComponent , canActivate: [AuthGuard]},
  { path: 'emp-data-edit/:id', component: EmpDataEditComponent , canActivate: [AuthGuard]},
  { path: 'emp-score-edit/:id', component: EmpScoreEditComponent , canActivate: [AuthGuard]},
  { path: 'send-social-links', component: SocialMediaLinksComponent , canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }