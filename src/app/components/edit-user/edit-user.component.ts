import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetuserForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  userForm: FormGroup;

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private ngZone: NgZone,
    private studentApi: ApiService,
    public httpClient: HttpClient
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.studentApi.GetUser(id).subscribe(data => {
      console.log('data',data)
      this.userForm = this.fb.group({
        user_name: [data.user_name, [Validators.required]],
        user_email: [data.user_email, [Validators.required]],
        password: [data.password, [Validators.required]],
        user_type: [data.user_type, [Validators.required]]
       })      
    })  

  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userForm.get('userpicture').setValue(file);
    } 
  }
  /* Reactive book form */
  submitBookForm() {
    this.userForm = this.fb.group({
      user_name: ['', [Validators.required]],
      user_email: ['', [Validators.required]],
      userpicture: [''],
      password: ['', [Validators.required]],
      user_type: ['2']
    })
  }


  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }  

  submitUserForm() {
    const SERVER_URL = "http://localhost:8000/users/add-user";

    const formData = new FormData();
    formData.append('userpicture', this.userForm.get('userpicture').value);
    formData.append('user_name', this.userForm.get('user_name').value);
    formData.append('user_email', this.userForm.get('user_email').value);
    formData.append('password', this.userForm.get('password').value);
    formData.append('user_type', this.userForm.get('user_type').value);
    if (this.userForm.valid) {
      console.log('formData',this.userForm.value);
      console.log('formData',formData);
   
      this.httpClient.post<any>(SERVER_URL, formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
      

    }
  }

}