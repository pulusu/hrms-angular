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
export interface Job_Location {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

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
  Job_Locations: Job_Location[] = [
    {value: 'BIO-MPR', viewValue: 'BIO-MPR'},
    {value: 'BIO-NRM', viewValue: 'BIO-NRM'},
    {value: 'BLR', viewValue: 'BLR'},
    {value: 'NRM', viewValue: 'NRM'},
  ];
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
      this.userForm.get('resume').setValue(file);
    }
  }
  onFileSelectfileInputformatted_resume(event) {
    if (event.target.files.length > 0) {
      const files = event.target.files[0];
      this.userForm.get('formatted_resume').setValue(files);
    }
  }  /* Reactive book form */
  submitBookForm() {
    this.userForm = this.fb.group({
      Requirment_for: ['', [Validators.required]],
      Job_Location: ['', [Validators.required]],
      First_Name: ['', [Validators.required]],
      Last_Name: ['', [Validators.required]],
      resume: [''],
      Mobile_Number: ['', [Validators.required]],
      Email_Id: ['', [Validators.required]],
      current_company: ['', [Validators.required]],
      Skill_Set_1: ['', [Validators.required]],
      Skill_Set_2: ['', [Validators.required]],
      Current_CTC: ['', [Validators.required]],
      remarks: ['', [Validators.required]],
      Current_Location: ['', [Validators.required]],
      Position_Type: ['', [Validators.required]],
      Middle_Name: ['', [Validators.required]],
      Client_Name: ['', [Validators.required]],
      Alternate_Number: ['', [Validators.required]],
      business_email: ['', [Validators.required]],
      Total_Years_Of_Experience: ['', [Validators.required]],
      Skill_Set_1_exp_year: ['', [Validators.required]],
      Skill_Set_2_exp_year: ['', [Validators.required]],
      Skill_Set_1_exp_month: ['', [Validators.required]],
      Skill_Set_2_exp_month: ['', [Validators.required]],
      Expected_CTC: ['', [Validators.required]],
      formatted_resume: ['', [Validators.required]]
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
    const SERVER_URL = "http://localhost:8000/profiles/add-profile";

    const formData = new FormData();
    formData.append('resume', this.userForm.get('resume').value);
    formData.append('formatted_resume', this.userForm.get('formatted_resume').value);
    formData.append('Requirment_for', this.userForm.get('Requirment_for').value);
    formData.append('Job_Location', this.userForm.get('Job_Location').value);
    formData.append('First_Name', this.userForm.get('First_Name').value);
    formData.append('Last_Name', this.userForm.get('Last_Name').value);
    formData.append('Mobile_Number', this.userForm.get('Mobile_Number').value);
    formData.append('Email_Id', this.userForm.get('Email_Id').value);
    formData.append('current_company', this.userForm.get('current_company').value);
    formData.append('Skill_Set_1', this.userForm.get('Skill_Set_1').value);
    formData.append('Skill_Set_2', this.userForm.get('Skill_Set_2').value);
    formData.append('Current_CTC', this.userForm.get('Current_CTC').value);
    formData.append('remarks', this.userForm.get('remarks').value);
    formData.append('Current_Location', this.userForm.get('Current_Location').value);
    formData.append('Position_Type', this.userForm.get('Position_Type').value);
    formData.append('Middle_Name', this.userForm.get('Middle_Name').value);
    formData.append('Client_Name', this.userForm.get('Client_Name').value);
    formData.append('Alternate_Number', this.userForm.get('Alternate_Number').value);
    formData.append('business_email', this.userForm.get('business_email').value);
    formData.append('Total_Years_Of_Experience', this.userForm.get('Total_Years_Of_Experience').value);
    formData.append('Skill_Set_1_exp_year', this.userForm.get('Skill_Set_1_exp_year').value);
    formData.append('Skill_Set_2_exp_year', this.userForm.get('Skill_Set_2_exp_year').value);
    formData.append('Skill_Set_1_exp_month', this.userForm.get('Skill_Set_1_exp_month').value);
    formData.append('Skill_Set_2_exp_month', this.userForm.get('Skill_Set_2_exp_month').value);
    formData.append('Expected_CTC', this.userForm.get('Expected_CTC').value);
    formData.append('submitted_by', '1');
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