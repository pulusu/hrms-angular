import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-team-add-member',
  templateUrl: './team-add-member.component.html',
  styleUrls: ['./team-add-member.component.css']
})
export class TeamAddMemberComponent implements OnInit {
	teamAddmemberForm: FormGroup;
	isLoadingResults = false;
  currentTrackUser;
  currentTrackAdmin;
  
  //employess_result;
  //emp_tempcountry_result;
  //tempcarrier_Result;
  tempteam_Result;
  carrier_Result;
  tempEmp_Result;
  emp_Result;
  teamid;
  ipl_team_view;
  Message;
  isAdmin;


     constructor(private router: Router, private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder,private http: HttpClient) {
      console.log("routes");
      console.log('teamid',activatedRoute.snapshot.url); // array of states
      this.teamid=activatedRoute.snapshot.url[1].path;
      console.log(activatedRoute.snapshot.url[0].path); 
      this.onloadTeam();
      this.teamsSelect();
      this.EmployeeSelect();

     }      
         
  ngOnInit() {
    this.loadScript('../assets/bundles/libscripts.bundle.js');
    this.loadScript('../assets/bundles/vendorscripts.bundle.js');
    this.loadScript('../assets/bundles/datatablescripts.bundle.js');
    this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
    this.loadScript('../assets/bundles/mainscripts.bundle.js');
    this.loadScript('../assets/js/pages/tables/jquery-datatable.js');
    this.loadScript('../assets/js/pages/ui/dialogs.js');
    //this.carrierSelect();
   // this.headSelect();
 

       // Start Form Validations //
   this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));
   this.currentTrackAdmin = localStorage.getItem('hrms-currentTrack-admin');
   if(this.currentTrackAdmin=='true'){
     this.isAdmin=true;  
   }
   this.teamAddmemberForm = this.formBuilder.group({
     'team_name_id' : [this.teamid, Validators.required],
     'team_member' : [null, Validators.required],
     'created_by' : [null],
   });
  }
    
  onFormSubmit(form:NgForm) {
	  this.isLoadingResults = true;
    this.teamAddmemberForm.value.created_by=this.currentTrackUser._id;
    console.log('this.teamAddmemberForm.value',this.teamAddmemberForm.value)

    console.log(this.teamAddmemberForm.value.team_name_id._id)
    console.log(this.teamAddmemberForm.value.team_member._id)
    
            this.teamAddmemberForm.value.department_head=this.teamAddmemberForm.value.team_name_id._id;
      this.http.post(`${environment.api_url}`+`${environment.team_member_add}`, this.teamAddmemberForm.value).subscribe((datasubmit:any)=>{
      this.isLoadingResults = false;            
      this.Message="Team Member added Successfully";
		  setTimeout(()=>{
		  this.Message = null;
      this.router.navigate(['/team-details/',this.teamid]);	 
			},500); 
			
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
teamsSelect(){
  let obs=this.http.get(`${environment.api_url}`+`${environment.emp_teams}`)
  obs.subscribe((carrier_Result:any)=>{ 
    this.tempteam_Result = carrier_Result;
    console.log('this.tempteam_Result',this.tempteam_Result)
    this.suggest_carrier('');
  });
}
suggest_carrier(team_name){
  this.carrier_Result = this.tempteam_Result.filter(response => response.team_name.toLowerCase().startsWith(team_name.toLowerCase())).slice(0, 10);
}  
displayFn(country): string {
  return country ? country.team_name : country;
}   
 
displayFnemp(emp): string {
  return emp ? emp.empl_name : emp;
}  
EmployeeSelect(){
  let obs=this.http.get(`${environment.api_url}`+`${environment.emp_data_list}`)
  obs.subscribe((emp_Result:any)=>{ 
    this.tempEmp_Result = emp_Result;
    console.log('this.tempEmp_Result',this.tempEmp_Result)
    this.suggest_manager('');
  });
}
suggest_manager(employee_name){
  this.emp_Result = this.tempEmp_Result.filter(response => response.employee_name.toLowerCase().startsWith(employee_name.toLowerCase())).slice(0, 3);
}
onloadTeam() {
  this.http.get(`${environment.api_url}`+`${environment.ipl_team_view}`+'/'+this.teamid).subscribe((form:any)=>{
     this.ipl_team_view=form;
     console.log('ipl_team_view',form)
          }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
}

  
}
