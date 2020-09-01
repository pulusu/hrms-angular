import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-employee-data-list',
  templateUrl: './employee-data-list.component.html',
  styleUrls: ['./employee-data-list.component.css']
})
export class EmployeeDataListComponent implements OnInit {
	isLoadingResults
	employeelist;
	currentTrackUser;
  currentTrackAdmin;
  isAdmin;
key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;
  show_dialog: boolean= false;
  //loadviewEmp: boolean= false;
//demo:any = true;
 empFormGroup: FormGroup;
  constructor(private router: Router, private _formBuilder: FormBuilder,private http: HttpClient) {
    this.onloadEmployee();
  }

  ngOnInit() {
	   this.loadScript('../assets/bundles/libscripts.bundle.js');
     this.loadScript('../assets/bundles/vendorscripts.bundle.js');
     this.loadScript('../assets/bundles/datatablescripts.bundle.js');
     this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
     this.loadScript('../assets/bundles/mainscripts.bundle.js');
     this.loadScript('../assets/js/pages/tables/jquery-datatable.js');
     this.loadScript('../assets/js/pages/ui/dialogs.js');
     this.currentTrackAdmin = localStorage.getItem('hrms-currentTrack-admin');
      if(this.currentTrackAdmin=='true'){
      this.isAdmin=true;
	  }
	  this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));

	 
	
	
	this.empFormGroup = this._formBuilder.group({
     'emp_id' : [null, Validators.required],
	   'emp_name' : [null, Validators.required],
     'emp_designation' : [null, Validators.required],
     'emp_department' : [null, Validators.required],
     'emp_doj' : [null, Validators.required],
     'emp_mobile' : [null, Validators.required],
     'emp_actual_dob' : [null, Validators.required],
     'emp_dob_records' : [null, Validators.required],
     'emp_wedding_anniversary' : [null, Validators.required],
     'created_by' : [null]
      });
  }
  
  onloadEmployee() {
    this.http.get(`${environment.api_url}`+`${environment.emp_data_list}`).subscribe((form:any)=>{
       this.employeelist=form;
       console.log('departments_list',this.employeelist);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
   public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  deleteEmployee(index: number, e){
    if(window.confirm('Are you sure')) {
      console.log('employees_update',e)
      var myObj = {};
      myObj['employee_profie_pic'] = 10;
      console.log('statusdata',e)
      this.http.delete(`${environment.api_url}`+`${environment.emp_data_delete}/${e._id}`).subscribe((form:any)=>{
      console.log("employeeForm", form);
      this.onloadEmployee() ;
        }, (err) => {
          console.log('err',err);
          this.isLoadingResults = false;
        });
        
        
  
    }
  }

}
