// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://175.101.4.30:8700/',
//api_url:'http://localhost:8000/',  
api_key:'nandu@123',
  sendMail:'users/sendmail',
  holidays_list:'holidays/all',
  holidays_add:'holidays/add-holiday',
  holiday_delete:'holidays/delete-holidays/',
  events_list:'events/all',
  events_add:'events/event-add',
  employee_add:'employees/employee-add',
  employees_list:'employees/all',
  employees_update:'employees/update-employee',
  employees_delete:'employees/delete-employee',
  employeeTotalCount:'employees/countEmployeesall',
  employeeTotalMaleCount:'employees/countEmployeesMale',
  employeeTotalFemaleCount:'employees/countEmployeesFemale',
  employee_details:'employees/read-employee',
  departments_list:'departments/all',
  departments_add:'departments/department-add',
  departments_view:'departments/read-department',
  departments_update:'departments/update-department',
  departments_delete:'departments/delete-department',
  leaves_list:'leaves/all',  
  myleaves_list:'leaves/myall',  
  leave_add:'leaves/leave-add',
  leave_view:'leaves/read-leave',
  leave_update:'leaves/update-leave',
  leave_delete:'leaves/delete-leave',
  empaddcount:'employees/countActiveInactiveEmp',
  empinactivecount:'employees/countInactiveEmployees',
  empthismonth:'employees/thisMonthEmployee',
  empthismonthbirthdays:'employees/thisMonthDobemployes',
  empthismonthholidays:'holidays/thisMonthHolidays',
  emp_teams:'teams/all',
  emp_teams_byid:'teams/byid',
  emp_teams_add:'teams/team-add',
  team_member_add:'teammembers/teammember-add',
  ipl_team_details:'teammembers/all',
  ipl_team_view:'teams/read-team',
  ipl_member_score_add:'member_score/member_score-add',
  ipl_teammembers_all:'teammembers/members-all',
  ipl_member_details:'teammembers/read-teammember',
  ipl_team_membeer_details:'member_score/membber-details',
  ipl_delete_score_day:'member_score/delete-member_score',
  ipl_score_details_by_id:'member_score/read-member_score',
  ipl_score_update:'member_score/update-member_score/',
  emp_data_add:'empdata/empdata-add',
  emp_data_list:'empdata/all',
  emp_data_details:'empdata/read-Employeesdata',
  emp_data_delete:'empdata/delete-Employeesdata',
  emp_data_update:'empdata/update-Employeesdata',
  send_social_links:'empdata/send-social-links'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
