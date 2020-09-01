import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    valid_er:any;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            console.log('Logined');
            this.router.navigate(['/teams-list']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/teams-list';
            this.loadScript('//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js');
            this.loadScript('//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js');
        }
             
        loadScript(url: string) {
          const body = <HTMLDivElement> document.body;
          const script = document.createElement('script');
          script.innerHTML = '';
          script.src = url;
          script.async = false;
          script.defer = true;
          body.appendChild(script);
        }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data.length==0){
                        this.valid_er= 'Enter Valid Credentials';
                       // this.alertService.error(this.valid_er);
                        this.loading = false;
                        }else if(data.length==1){
                            if(data[0]._id=='5f05789c2134601430718969'){
                                localStorage.setItem('hrms-currentTrack-admin', 'true');
                            }else{
                                localStorage.setItem('hrms-currentTrack-admin', 'false');
                            }
                            localStorage.setItem('hrms-kairos-currentTrackUser', JSON.stringify(data[0]));
                            var currentTrackUser = localStorage.getItem('hrms-kairos-currentTrackUser');
                           this.router.navigate([this.returnUrl]);
                        }else{
                        } 
                }, 
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
