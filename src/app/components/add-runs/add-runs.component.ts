import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-runs',
  templateUrl: './add-runs.component.html',
  styleUrls: ['./add-runs.component.css']
})
export class AddRunsComponent implements OnInit {
	currentTrackUser;
isLoadingResults;
Message;
 tempteam_Result;
  carrier_Result;
  tempEmp_Result;
   emp_Result;
runsForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder,private http: HttpClient) { 
    this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));
    this.teamsSelect();
  //  this.EmployeeSelect();
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

   this.runsForm = this.formBuilder.group({
	 'team_name_id' : [null, Validators.required],
	 'team_member' : [null, Validators.required],
   'emp_accuracy' : [null, Validators.required],
   'emp_submissions' : [null, Validators.required],
   'emp_closures' : [null, Validators.required],
   'emp_compliance' : [null, Validators.required],
   'emp_bonus' : [null, Validators.required],
   'score_date' : [null, Validators.required],
   'total_score' : [null],
   'created_by' : [null]
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
  onFormSubmit(form:NgForm) {

    if(this.runsForm.value.team_name_id._id == undefined){

      this.runsForm.value.team_name_id = '';
      this.Message="Please select valid Team";
      setTimeout(()=>{	
        this.Message = "";  
       },1500);
    }else if(this.runsForm.value.team_member._id == undefined){

      this.runsForm.value.team_name_id = '';
      this.Message="Please select valid member";
      setTimeout(()=>{	
        this.Message = "";  
       },1500);
    }else{
      this.isLoadingResults = true; 
      this.runsForm.value.created_by=this.currentTrackUser._id;
     var total_scores = parseFloat(this.runsForm.value.emp_accuracy)+parseFloat(this.runsForm.value.emp_bonus)+parseFloat(this.runsForm.value.emp_closures)+parseFloat(this.runsForm.value.emp_compliance)+parseFloat(this.runsForm.value.emp_submissions);
      this.runsForm.value.total_score = total_scores
      this.http.post(`${environment.api_url}`+`${environment.ipl_member_score_add}`, this.runsForm.value).subscribe((datasubmit:any)=>{
      console.log('datasubmit',datasubmit)
      this.isLoadingResults = false;            
      if(datasubmit.error){
        this.Message="Date alrady existed";
        setTimeout(()=>{	
          this.Message = null;  
         },1500);

      }else{
        this.Message="Score added Successfully";
        setTimeout(()=>{	
            this.Message = null;  
            var id =this.runsForm.value.team_member._id;
            var team_id =this.runsForm.value.team_name_id._id
            this.router.navigate(['/team-member-details',id,team_id]);	
       },500);
      }
 
			      }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });

    
    }
    
  }
  
  teamsSelect(){
    if(this.currentTrackUser._id==='5f33d1b30167793254f0648f'){
    var  obs=this.http.get(`${environment.api_url}`+`${environment.emp_teams}`);
    } else {
      var  obs=this.http.get(`${environment.api_url}`+`${environment.emp_teams_byid}`+`/`+this.currentTrackUser._id);
    }
    obs.subscribe((carrier_Result:any)=>{ 
    this.tempteam_Result = carrier_Result;
    if(carrier_Result.length==0){
      alert("You don't have teams")
      this.router.navigate(['/dashboard']);	

    }
    console.log('this.tempteam_Result',this.tempteam_Result)
    this.suggest_carrier('');
  });
}
suggest_carrier(team_name){
  this.carrier_Result = this.tempteam_Result.filter(response => response.team_name.toLowerCase().startsWith(team_name.toLowerCase())).slice(0, 6);
}  
displayFn(country): string {
  return country ? country.team_name : country;
}   
 
displayFnemp(emp): string {
  return emp ? emp.team_member : emp;
}  
EmployeeSelect(){
  let obs=this.http.get(`${environment.api_url}`+`${environment.ipl_teammembers_all}`)
  obs.subscribe((emp_Result:any)=>{ 
    this.tempEmp_Result = emp_Result;
    console.log('this.tempEmp_Result',this.tempEmp_Result)
    this.suggest_manager('');
  });
}
suggest_manager(team_member){
  this.emp_Result = this.tempEmp_Result.filter(response => response.team_member.toLowerCase().startsWith(team_member.toLowerCase())).slice(0, 6);
}
dataChanged(newObj) {
console.log('newObj',newObj._id)
let obs=this.http.get(`${environment.api_url}`+`${environment.ipl_team_details}`+'/'+newObj._id)
  obs.subscribe((emp_Result:any)=>{ 
    this.tempEmp_Result = emp_Result;
    console.log('this.tempEmp_Result',this.tempEmp_Result)
    this.suggest_manager('');
  });
}

numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

}
