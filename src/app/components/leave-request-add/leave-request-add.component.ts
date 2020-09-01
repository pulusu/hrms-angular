import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

export interface leaveType{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-leave-request-add',
  templateUrl: './leave-request-add.component.html',
  styleUrls: ['./leave-request-add.component.css']
})
export class LeaveRequestAddComponent implements OnInit {
  @Input() max: any;
  tomorrow = new Date();

  leaveTypes: leaveType[] = [
    {value: 'Casual Leave', viewValue: 'Casual Leave'},
    {value: 'Medical Leave', viewValue: 'Medical Leave'},
    {value: 'Maternity Leave', viewValue: 'Maternity Leave'}
  ];
  
  currentTrackUser;
  employess_result;
  emp_tempcountry_result;
  tempcarrier_Result;
  carrier_Result;
  department_head_name;
  leaveForm: FormGroup;
  isLoadingResults;
  Message;
  mailData:any;
  repo_id:any;
  repo_name:any;
  repo_employee_office_email:any;

  constructor(private router: Router, private formBuilder: FormBuilder,private http: HttpClient) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    let userDetails = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));
    let employee_reporting_manager = userDetails.employee_reporting_manager[0];
    this.http.get(`${environment.api_url}`+`${environment.employee_details}`+'/'+employee_reporting_manager).subscribe((datareturn:any)=>{
      var data =datareturn[0];
      this.repo_id =data.reporting_manager[0]._id;
      this.repo_name =data.reporting_manager[0].employee_name;
      this.repo_employee_office_email =data.reporting_manager[0].employee_office_email;

      this.leaveForm = this.formBuilder.group({
        'department_head_name' : [this.repo_name, Validators.required],
        'leave_name' : [null, Validators.required],
        'leave_to_date' :[null, Validators.required],
        'leave_from_date' :[null, Validators.required],
        'leave_description':[null, Validators.required],
        'created_by' : [null]
        });
   })

  
  }

  ngOnInit() {
    this.loadScript('../assets/bundles/libscripts.bundle.js');
    this.loadScript('../assets/bundles/vendorscripts.bundle.js');
    this.loadScript('../assets/bundles/datatablescripts.bundle.js');
    this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
    this.loadScript('../assets/bundles/mainscripts.bundle.js');
    this.loadScript('../assets/js/pages/tables/jquery-datatable.js');
    this.loadScript('../assets/js/pages/ui/dialogs.js');
    this.carrierSelect();
   // this.headSelect();
 

       // Start Form Validations //
   this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));
   this.leaveForm = this.formBuilder.group({ 
     'leave_name' : [null, Validators.required],
     'department_head_name' : [null, Validators.required],
     'leave_to_date' :[null, Validators.required],
     'leave_from_date' :[null, Validators.required],
     'leave_description':[null, Validators.required],
     'created_by' : [null]
   });
  }
  displayFn(country): string {
    return country ? country.employee_name : country;
  }  
 
  carrierSelect(){
    let obs=this.http.get(`${environment.api_url}`+`${environment.employees_list}`)
    obs.subscribe((carrier_Result:any)=>{ 
      this.tempcarrier_Result = carrier_Result;
      this.suggest_carrier('');
    });
  }

  suggest_carrier(employee_name){
    this.carrier_Result = this.tempcarrier_Result.filter(response => response.employee_name.toLowerCase().startsWith(employee_name.toLowerCase())).slice(0, 3);
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
  onFormSubmit(form:NgForm) {
      this.leaveForm.value.created_by=this.currentTrackUser._id;
      this.leaveForm.value.department_head=this.repo_id;
 
      console.log('this.leaveForm.value',this.leaveForm.value);

      this.http.post(`${environment.api_url}`+`${environment.leave_add}`, this.leaveForm.value).subscribe((datasubmit:any)=>{
      this.isLoadingResults = false;            
      this.Message="leaveForm added Successfully";
      const mailData={};
        mailData['subject']=this.leaveForm.value.leave_name; 
        mailData['from_mail']=this.currentTrackUser.employee_office_email; 
        mailData['to_mail']=this.repo_employee_office_email;
        mailData['text'] ='Hi '+this.repo_name+', <br> <p><b>From Date </b>:'+this.leaveForm.value.leave_from_date+'</p><p><b>To Date </b>:'+this.leaveForm.value.leave_to_date+'</p><p><b>Reason </b>:'+this.leaveForm.value.leave_description;
      console.log('mailData',mailData)  
      this.sentMail(mailData);
		  setTimeout(()=>{
		  this.Message = null;
      this.router.navigate(['/emp-leave-requests']);	 
			},1000);          
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
    
  }

  sentMail(mailData) {

    this.http.post(`${environment.api_url}`+`${environment.sendMail}`, mailData).subscribe((sentmaildata:any)=>{
    this.isLoadingResults = false;
    setTimeout(()=>{
    this.Message = null;
    },1000);          
      }, (err) => {
        console.log(err);
      });
  
  }


}
