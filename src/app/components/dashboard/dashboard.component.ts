import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentTrackAdmin;
  departmentList:any;
  isLoadingResults=false;
  empaddcount:any;
  empinactivecount:any;
  empinactiveper:any;
  empallcount:any;
  empactiveper:any;
  empmale:any;
  empmalperc:any;
  empfmale:any;
  empfemaleperc:any;
  eventslist:any;
  //empgender:any;
  empthismonth:any;
  empthismonthanniversary:any;
  //empthisMonthAnniversary:any;
  empthismonthbirthdays:any;
  holidayslist:any;
  
  
  constructor(private router: Router, private formBuilder: FormBuilder,private http: HttpClient) {      	
	this.onloadDepartMents();
	
    
	this.employeeAddCount();
	this.empInactiveCount();
	this.onloadtotalEmpCount();
	this.employeeTotalMaleCount();
	this.employeeTotalFemaleCount();
	this.employeeEventsList();
	this.employeeThisMonth();
	this.empthisMonthAnniversary();
	this.employeeThisMonthBirthdays();
	this.holidayList();
	
	//this.empActivePer();
	//this.employeeMalePer();
    //this.employeeFemalePer();	
 
  }

  ngOnInit() {
	  // Start Load JS Files //
	 this.loadScript('../assets/bundles/libscripts.bundle.js');
   this.loadScript('../assets/bundles/vendorscripts.bundle.js');
   this.loadScript('../assets/js/toastr.js');
	 this.loadScript('../assets/js/chartist.bundle.js');
	 this.loadScript('../assets/js/knob.bundle.js');
   this.loadScript('../assets/bundles/mainscripts.bundle.js');
   this.loadScript('../assets/js/index.js');
   this.currentTrackAdmin = localStorage.getItem('hrms-currentTrack-admin');
    if(this.currentTrackAdmin!=='true'){
      this.router.navigate(['/events']);	 
    }
    console.log('this.currentTrackAdmin',this.currentTrackAdmin)
   
	//this.employeeTotalGenderCount();
 
  }
  

  onloadDepartMents() {
    this.http.get(`${environment.api_url}`+`${environment.departments_list}`).subscribe((form:any)=>{
       this.departmentList=form;
       //console.log('departmentList',this.departmentList);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }); 
  }
  
employeeAddCount(){
	 this.http.get(`${environment.api_url}`+`${environment.empaddcount}`).subscribe((form:any)=>{
       this.empaddcount=form[0].count_all_emp;
        //this.empfemaleperc =  (this.empfmale / this.empallcount * 100).toFixed(2);
	   //console.log('empaddcount',this.empaddcount);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
 } 
 empInactiveCount(){
	 //alert("vd");
	 this.http.get(`${environment.api_url}`+`${environment.empinactivecount}`).subscribe((form:any)=>{
       this.empinactivecount=form[0].count_inactive_emp;
        //console.log('empaddcount',this.empaddcount);
	   console.log('empinactivecount',this.empinactivecount);
	   this.empinactiveper =  (this.empinactivecount / this.empaddcount * 100).toFixed(2);
	   console.log('empinactiveper',this.empinactiveper);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
 } 
 onloadtotalEmpCount() {
    this.http.get(`${environment.api_url}`+`${environment.employeeTotalCount}`).subscribe((form:any)=>{
       this.empallcount=form[0].count_active_emp;
       console.log('empallcount',this.empallcount);
	   this.empactiveper =  (this.empallcount / this.empaddcount * 100).toFixed(2);
	   console.log('empactiveper',this.empactiveper);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  employeeTotalMaleCount() {
    this.http.get(`${environment.api_url}`+`${environment.employeeTotalMaleCount}`).subscribe((form:any)=>{
       this.empmale=form[0].male_emp;
       //console.log('Male',this.empmale);
	   	 this.empmalperc =  (this.empmale / this.empallcount * 100).toFixed(2);
	   console.log('empmalperc',this.empmalperc);
               }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  employeeTotalFemaleCount() {
    this.http.get(`${environment.api_url}`+`${environment.employeeTotalFemaleCount}`).subscribe((form:any)=>{
       this.empfmale=form[0].female_emp;
        this.empfemaleperc =  (this.empfmale / this.empallcount * 100).toFixed(2);
	   //console.log('empfemaleperc',this.empfemaleperc);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
 employeeEventsList(){
	 this.http.get(`${environment.api_url}`+`${environment.events_list}`).subscribe((form:any)=>{
             //console.log("events_list", form);
       this.eventslist=form;
       localStorage.setItem('calander-events', JSON.stringify(this.eventslist));
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
 }
employeeThisMonth(){
	
	this.http.get(`${environment.api_url}`+`${environment.empthismonth}`).subscribe((form:any)=>{
             //console.log("events_list", form);
       this.empthismonth=form.response.length;
        console.log('empthismonth',this.empthismonth);
		this.empthismonthanniversary=form;
		console.log('empthismonthanniversary',this.empthismonthanniversary);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
}
empthisMonthAnniversary(){
	
	this.http.get(`${environment.api_url}`+`${environment.empthismonth}`).subscribe((form:any)=>{
             //console.log("events_list", form);
       
		this.empthismonthanniversary=form.response;
		console.log('empthismonthanniversary',this.empthismonthanniversary);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
}
 employeeThisMonthBirthdays(){
	 
	this.http.get(`${environment.api_url}`+`${environment.empthismonthbirthdays}`).subscribe((form:any)=>{
		
             //console.log("events_list", form);
       //this.empthismonthbirthdaysname=form[0].employee_name;
	    //console.log('empthismonthbirthdaysname',this.empthismonthbirthdaysname);
	   this.empthismonthbirthdays=form;
        console.log('empthismonthbirthdays',this.empthismonthbirthdays);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
 }
 holidayList() {
	  this.http.get(`${environment.api_url}`+`${environment.empthismonthholidays}`).subscribe((form:any)=>{
             console.log("holidayFormliist", form);
			 this.holidayslist=form.response;
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');

    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
