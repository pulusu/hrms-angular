import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-team-member-details',
  templateUrl: './team-member-details.component.html',
  styleUrls: ['./team-member-details.component.css']
})
export class TeamMemberDetailsComponent implements OnInit {

  team_details;
  teamid;
  membber_details;
  membber_id;
  ipl_team_view;
  isLoadingResults = false;
  Message;
  currentTrackUser;
  teamhead;
  action=false;

  constructor(private router: Router,private activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder,private http: HttpClient) {
    this.teamid=activatedRoute.snapshot.url[1].path;
    this.membber_id=activatedRoute.snapshot.url[2].path;
    this.onloadEmployee();
    this.onloadMember();
    this.onloadTeam();
    
   } 
  ngOnInit() {
    this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));
  }
  onloadEmployee() {
    this.http.get(`${environment.api_url}`+`${environment.ipl_team_membeer_details}`+'/'+this.teamid).subscribe((form:any)=>{
       this.team_details=form.Users;
       this.teamhead=this.team_details[0].team[0].team_head[0];
       if(this.currentTrackUser._id===this.teamhead || this.currentTrackUser._id==='5f33d1b30167793254f0648f'){
        this.action=true;
       }
             }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  onloadMember() {
    this.http.get(`${environment.api_url}`+`${environment.ipl_member_details}`+'/'+this.teamid).subscribe((form_member:any)=>{
       this.membber_details=form_member;
       console.log('teams-memberss',form_member)
            }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  deleteScore(cid){
	  if(confirm("Are you sure to delete ?")) {
         this.isLoadingResults = true;  
	     this.http.delete<any>(`${environment.api_url}`+`${environment.ipl_delete_score_day}`+'/'+cid).subscribe((datar)=>{
          this.isLoadingResults = false;  
		  this.Message="Deleted Successfully";
  		  this.onloadEmployee();
		  setTimeout(()=>{
		  this.Message = null;
		   },2000);          
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  
  }
  onloadTeam() {
    this.http.get(`${environment.api_url}`+`${environment.ipl_team_view}`+'/'+this.membber_id).subscribe((ipl_team_viewform:any)=>{
       this.ipl_team_view=ipl_team_viewform;
       console.log('ipl_team',this.ipl_team_view)
            }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
