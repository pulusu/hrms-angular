import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  currentTrackUser:any;
  logourl:any;
  empInfo:any;
  employee_profie_pic:any;
  employee_login_name:any;
  currentTrackAdmin:any;
  isAdmin=false;
  addruns=false;
  addscore=true;

  constructor(private router: Router,    private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,private http: HttpClient) {}

  ngOnInit() {
    this.logourl='https://www.kairostech.com/wp-content/uploads/2019/07/kairos-final-logo.svg';
    this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));
    this.currentTrackAdmin = localStorage.getItem('hrms-currentTrack-admin');
    this.teamsSelect()
    if(this.currentTrackAdmin=='true'){
      this.isAdmin=true;  
    }
    console.log('login',this.currentTrackUser._id);
    var id=this.currentTrackUser._id;
    if(id=='5f05789c2134601430718969' || this.currentTrackUser._id==='5f33d1b30167793254f0648f'){
      this.addruns=true;
    }
    this.http.get(`${environment.api_url}`+`${environment.employee_details}`+'/'+id).subscribe((data:any)=>{
      this.empInfo=data[0];
      this.employee_profie_pic=data[0].employee_profie_pic;
      this.employee_login_name=data[0].employee_name;
      if(!this.employee_profie_pic){
        this.employee_profie_pic='/assets/images/sample-pic.png';
      }
    })

    }
    teamsSelect(){
      console.log('sssss',this.currentTrackUser)
      let obs=this.http.get(`${environment.api_url}`+`${environment.emp_teams_byid}`+`/`+this.currentTrackUser._id)
      obs.subscribe((carrier_Result:any)=>{ 
      if(carrier_Result.length==0){
        this.addscore=false;
      }
      });
  }

}
