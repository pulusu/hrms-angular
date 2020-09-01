import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teamslist;
  isLoadingResults = false;

  constructor(private router: Router,private activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder,private http: HttpClient) {
    this.onloadEmployee();
    console.log("routes");
    console.log(activatedRoute.snapshot.url); // array of states
    console.log(activatedRoute.snapshot.url[0].path); 

   }

  ngOnInit() {

  }
   

  onloadEmployee() {
    this.http.get(`${environment.api_url}`+`${environment.emp_teams}`).subscribe((form:any)=>{
       this.teamslist=form;
       console.log('teams-list',form)
            }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
