import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-emp-leave-requests',
  templateUrl: './emp-leave-requests.component.html',
  styleUrls: ['./emp-leave-requests.component.css']
})
export class EmpLeaveRequestsComponent implements OnInit {

  isLoadingResults;
  leaves_list;
  currentTrackUser;
  currentTrackAdmin;
  isAdmin;
  key: string = 'name';
  reverse: boolean = false;
  monthCount:any;
  apr_leaves:any;
  reamine_leaves:any;
  unearnedLeaves:any;
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
    var start =new Date(2020, 0, 1);
    var end =new Date();
    var tempDate = new Date(start);
    var monthCount = 0;
    while((tempDate.getMonth()+''+tempDate.getFullYear()) != (end.getMonth()+''+end.getFullYear())) {
        monthCount++;
        tempDate.setMonth(tempDate.getMonth()+1);
    }
    this.monthCount= (monthCount+1)*(1.75);
     	 // Start Form Validations // 
    this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));
    this.currentTrackAdmin = localStorage.getItem('hrms-currentTrack-admin');
    if(this.currentTrackAdmin=='true'){
      this.isAdmin=true;
    }
 
  }  
  onloadEmployee() {
        this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));
        this.currentTrackAdmin = localStorage.getItem('hrms-currentTrack-admin');
        if(this.currentTrackAdmin=='true'){ 
           var leavs_url=`${environment.api_url}`+`${environment.leaves_list}`;
        }else{
            var leavs_url=`${environment.api_url}`+`${environment.myleaves_list}`+'/'+this.currentTrackUser._id;
        }
       this.http.get(leavs_url).subscribe((form:any)=>{
        this.apr_leaves = 0;

       form.forEach((key) => {

        let date1 = new Date(key.leave_from_date).getTime();
        let date2 = new Date(key.leave_to_date).getTime();
        let time = date2 - date1;  //msec
        let millisecondsPerDay = 86400 * 1000
        let days = Math.ceil(time / millisecondsPerDay);
        let dayl =days+1;
        key["days"] = dayl;
        if((key.leave_status==1) && (key.created_by==this.currentTrackUser._id)){
          this.apr_leaves = this.apr_leaves+dayl;
        }

        })
        let rleave=this.monthCount-this.apr_leaves;
        if(rleave>0){
          this.reamine_leaves=Math.abs(this.monthCount - this.apr_leaves)
          this.unearnedLeaves=0;
         }else{
          this.reamine_leaves=0;
          this.unearnedLeaves=Math.abs(this.monthCount - this.apr_leaves);
        }
        this.leaves_list=form;
      

        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  
  InActiveEmployee(index: number, e){
    if(window.confirm('Are you sure Inactive')) {
      var myObj = {};
      myObj['leave_status'] = 0;
      this.http.put(`${environment.api_url}`+`${environment.leave_update}/${e._id}`, myObj).subscribe((form:any)=>{

      this.onloadEmployee();
        }, (err) => {
          console.log('err',err);
          this.isLoadingResults = false;
        });
      }
  }  
  ActiveEmployee(index: number, e){
    if(window.confirm('Are you sure Approve')) {
      var myObj = {};
      myObj['leave_status'] = 1;
      this.http.put(`${environment.api_url}`+`${environment.leave_update}/${e._id}`, myObj).subscribe((form:any)=>{
      console.log("employeeForm", form);
      this.onloadEmployee();
        }, (err) => {
          console.log('err',err);
          this.isLoadingResults = false;
        });
      }
  }
  deleteEmployee(index: number, e){
    if(window.confirm('Are you sure')) {
      console.log('employees_update',e)
      this.http.delete(`${environment.api_url}`+`${environment.leave_delete}/${e._id}`).subscribe((form:any)=>{
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