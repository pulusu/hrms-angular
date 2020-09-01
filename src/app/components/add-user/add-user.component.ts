import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';


export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetuserForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  userForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private studentApi: ApiService,
    public httpClient: HttpClient
  ) { }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userForm.get('userpicture').setValue(file);
    }
  }
  onFileSelect2(event) {
    if (event.target.files.length > 0) {
      const file2 = event.target.files[0];
      this.userForm.get('userpicture2').setValue(file2);
    }
  }
    /* Reactive book form */
  submitBookForm() {
    this.userForm = this.fb.group({
      user_name: ['', [Validators.required]],
      user_email: ['', [Validators.required]],
      userpicture: [''],
      userpicture2: [''],
      password: ['', [Validators.required]],
      user_type: ['2']
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }  

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.userForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitUserForm() {
    const SERVER_URL = "http://localhost:8000/users/add-user";

    const formData = new FormData();
    formData.append('userpicture', this.userForm.get('userpicture').value);
    formData.append('userpicture2', this.userForm.get('userpicture2').value);
    formData.append('user_name', this.userForm.get('user_name').value);
    formData.append('user_email', this.userForm.get('user_email').value);
    formData.append('password', this.userForm.get('password').value);
    formData.append('user_type', this.userForm.get('user_type').value);
    if (this.userForm.valid) {
      console.log('formData',this.userForm);
      console.log('formData',formData);
   
      this.httpClient.post<any>(SERVER_URL, formData).subscribe(
        (res) => {
          console.log(res)
          this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
          },
        (err) => console.log(err)
      );
      

    }
  }

}