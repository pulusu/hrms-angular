import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-emp-score-edit',
  templateUrl: './emp-score-edit.component.html',
  styleUrls: ['./emp-score-edit.component.css']
})
export class EmpScoreEditComponent implements OnInit {

  currentTrackUser;
  isLoadingResults;
  Message;
  tempteam_Result;
  carrier_Result;
  tempEmp_Result;
  emp_Result;
  score_id;
  ipl_team_view;
  membber_details;
  team_member;
  team_name_id;
runsForm: FormGroup;
  constructor(private router: Router,private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,private http: HttpClient) { 
    this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));
    this.score_id = activatedRoute.snapshot.url[1].path;
    this.http.get(`${environment.api_url}`+`${environment.ipl_score_details_by_id}`+'/'+this.score_id).subscribe((datareturn:any)=>{
      console.log('datareturn',datareturn)
      this.team_member = datareturn.team_member[0];
      this.team_name_id = datareturn.team_name_id[0];
      
      this.runsForm = this.formBuilder.group({
        'emp_accuracy' : [datareturn.emp_accuracy, Validators.required],
        'emp_submissions' : [datareturn.emp_submissions, Validators.required],
        'emp_closures' : [datareturn.emp_closures, Validators.required],
        'emp_compliance' : [datareturn.emp_accuracy, Validators.required],
        'emp_bonus' : [datareturn.emp_bonus, Validators.required],
        'score_date' : [datareturn.score_date, Validators.required]
        });
     
  });
  this.onloadMember();
  this.onloadTeam();

}

  ngOnInit() {
	  this.loadScript('../assets/bundles/libscripts.bundle.js');
    this.loadScript('../assets/bundles/vendorscripts.bundle.js');
    this.loadScript('../assets/bundles/datatablescripts.bundle.js');
    this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
    this.loadScript('../assets/bundles/mainscripts.bundle.js');
    this.loadScript('../assets/js/pages/tables/jquery-datatable.js');
    this.loadScript('../assets/js/pages/ui/dialogs.js');
 

       // Start Form Validations //

   this.runsForm = this.formBuilder.group({
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
    
      this.isLoadingResults = true; 
      this.runsForm.value.created_by=this.currentTrackUser._id;
     var total_scores = parseFloat(this.runsForm.value.emp_accuracy)+parseFloat(this.runsForm.value.emp_bonus)+parseFloat(this.runsForm.value.emp_closures)+parseFloat(this.runsForm.value.emp_compliance)+parseFloat(this.runsForm.value.emp_submissions);
      this.runsForm.value.total_score = total_scores
      this.http.put(`${environment.api_url}`+`${environment.ipl_score_update}`+this.score_id, this.runsForm.value).subscribe((datasubmit:any)=>{
      console.log('datasubmit',datasubmit)
      this.isLoadingResults = false;            
      if(datasubmit.error){
        this.Message="Date alrady existed";
        setTimeout(()=>{	
          this.Message = null;  
         },1500);

      }else{
        this.Message="Score Updated Successfully";
        setTimeout(()=>{	
            this.Message = null;  
            this.router.navigate(['/team-member-details',this.team_member,this.score_id]);	
       },500);
      }
 
			      }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });

    
    
  }
  
  





onloadTeam() {
  this.http.get(`${environment.api_url}`+`${environment.ipl_team_view}`+'/'+this.team_name_id).subscribe((ipl_team_viewform:any)=>{
     this.ipl_team_view=ipl_team_viewform;
     console.log('ipl_team',ipl_team_viewform)
          }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
}
onloadMember() {
  this.http.get(`${environment.api_url}`+`${environment.ipl_member_details}`+'/'+this.team_member).subscribe((form_member:any)=>{
    this.membber_details=form_member;
          }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
}

}
