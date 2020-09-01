import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  team_details;
  ipl_team_view;
  teamid;
  display=false;
  isLoadingResults = false;
  currentTrackUser;
  currentTrackAdmin;
  isAdmin;

  constructor(private router: Router,private activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder,private http: HttpClient) {
    this.teamid=activatedRoute.snapshot.url[1].path;
    this.onloadTeam();
    this.onloadEmployee();
//    this.onloadeMemberDetail();
this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));
this.currentTrackAdmin = localStorage.getItem('hrms-currentTrack-admin');
if(this.currentTrackAdmin=='true' || this.currentTrackUser._id==='5f33d1b30167793254f0648f'){
  this.isAdmin=true;  
}

   } 
  ngOnInit() {
  }
  onloadEmployee() {
    this.http.get(`${environment.api_url}`+`${environment.ipl_team_details}`+'/'+this.teamid).subscribe((form:any)=>{
       this.team_details=form;
       console.log('teams',form);
       if(form.length===0){
         this.display=true;
       }else{
       
         this.display=false;
       }

       
            }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  onloadTeam() {
    this.http.get(`${environment.api_url}`+`${environment.ipl_team_view}`+'/'+this.teamid).subscribe((ipl_team_viewform:any)=>{
       this.ipl_team_view=ipl_team_viewform;
            }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
