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
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  studentForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray1: any = ['Hyderabad', 'Pune', 'Vizag', 'Delhi', 'Bangalore'];
  SectioinArray2: any = ['Hyderabad', 'Pune', 'Vizag', 'Delhi', 'Bangalore'];
  SectioinArray3: any = ['Hyderabad', 'Pune', 'Vizag', 'Delhi', 'Bangalore'];

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
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  /* Reactive book form */
  submitBookForm() {
    this.studentForm = this.fb.group({
      client_name: ['', [Validators.required]],
      primary_email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required]],
      location: ['', [Validators.required]],
      address: ['', [Validators.required]],
      Contact_Person_Name_1: ['', [Validators.required]],
      Mobile_Number_1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Office_Number_1: ['', [Validators.required]],
      Email_id_1: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      Location_1: [''],
      Contact_Person_Name_2: ['', [Validators.required]],
      Mobile_Number_2: ['', [Validators.required]],
      Office_Number_2: ['', [Validators.required]],
      Email_id_2: ['', [Validators.required]],
      Location_2: [''],
      aggrimentfile:['']
    })
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  }  

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.studentForm.get('aggrimentfile').setValue(file);
    }
  }
  /* Submit book */
  SERVER_URL = "http://localhost:8000/clients/add-client";
  submitStudentForm() {
    const formData = new FormData();
    formData.append('aggrimentfile', this.studentForm.get('aggrimentfile').value);
    formData.append('primary_email', this.studentForm.get('primary_email').value);
    formData.append('client_name', this.studentForm.get('client_name').value);
    formData.append('website', this.studentForm.get('website').value);
    formData.append('location', this.studentForm.get('location').value);
    formData.append('address', this.studentForm.get('address').value);
    formData.append('Contact_Person_Name_1', this.studentForm.get('Contact_Person_Name_1').value);
    formData.append('Mobile_Number_1', this.studentForm.get('Mobile_Number_1').value);
    formData.append('Office_Number_1', this.studentForm.get('Office_Number_1').value);
    formData.append('Email_id_1', this.studentForm.get('Email_id_1').value);
    formData.append('Location_1', this.studentForm.get('Location_1').value);
    formData.append('Contact_Person_Name_2', this.studentForm.get('Contact_Person_Name_2').value);
    formData.append('Mobile_Number_2', this.studentForm.get('Mobile_Number_2').value);
    formData.append('Office_Number_2', this.studentForm.get('Office_Number_2').value);
    formData.append('Email_id_2', this.studentForm.get('Email_id_2').value);
    formData.append('Location_2', this.studentForm.get('Location_2').value);
  console.log('formData',formData);
    if (this.studentForm.valid) {
      this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );


    }
  }
  // submitStudentForm() {
    //if (this.studentForm.valid) {
      //this.studentApi.AddClient(this.studentForm.value).subscribe(res => {
       // this.ngZone.run(() => this.router.navigateByUrl('/clients-list'))
     // });
   // }
 // }

}