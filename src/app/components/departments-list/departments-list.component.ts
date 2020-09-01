import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {
  isLoadingResults;
  employeelist;
  currentTrackUser;
  currentTrackAdmin;
  isAdmin;
  // For Pagination 

  
  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;
  constructor(private router: Router, private formBuilder: FormBuilder,private http: HttpClient) { }
   ngOnInit() {
     this.loadScript('../assets/bundles/libscripts.bundle.js');
     this.loadScript('../assets/bundles/vendorscripts.bundle.js');
     this.loadScript('../assets/bundles/datatablescripts.bundle.js');
     this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
     this.loadScript('../assets/bundles/mainscripts.bundle.js');
     this.loadScript('../assets/js/pages/tables/jquery-datatable.js');
     this.loadScript('../assets/js/pages/ui/dialogs.js');

    this.onloadEmployee();
     	 // Start Form Validations // 
    this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));
    this.currentTrackAdmin = localStorage.getItem('hrms-currentTrack-admin');
    if(this.currentTrackAdmin=='true'){
      this.isAdmin=true; 
    }

  }
  onloadEmployee() {
    this.http.get(`${environment.api_url}`+`${environment.departments_list}`).subscribe((form:any)=>{
       this.employeelist=form;
       console.log('departments_list',this.employeelist);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  deleteEmployee(index: number, e){
    if(window.confirm('Are you sure')) {
      console.log('employees_update',e)
      var myObj = {};
      myObj['employee_profie_pic'] = 3;
      console.log('statusdata',e)
      this.http.delete(`${environment.api_url}`+`${environment.departments_delete}/${e._id}`).subscribe((form:any)=>{
      console.log("employeeForm", form);
      this.onloadEmployee() ;
        }, (err) => {
          console.log('err',err);
          this.isLoadingResults = false;
        });
        
        
  
    }
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

}
