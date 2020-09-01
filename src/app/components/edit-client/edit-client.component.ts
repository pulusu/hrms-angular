import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

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
    private actRoute: ActivatedRoute,
    private studentApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.studentApi.GetClient(id).subscribe(data => {
      console.log(data)
      this.studentForm = this.fb.group({
        client_name: [data.client_name, [Validators.required]],
        location: [data.location, [Validators.required]],
        website: [data.website, [Validators.required]],
        primary_email: [data.primary_email, [Validators.required]],
        address: [data.address, [Validators.required]],
        Contact_Person_Name_1: [data.Contact_Person_Name_1, [Validators.required]],
        Mobile_Number_1: [data.Mobile_Number_1, [Validators.required]],
        Office_Number_1: [data.Office_Number_1, [Validators.required]],
        Email_id_1: [data.Email_id_1, [Validators.required]],
        Location_1: [data.Location_1, [Validators.required]],
        Contact_Person_Name_2: [data.Contact_Person_Name_2, [Validators.required]],
        Mobile_Number_2: [data.Mobile_Number_2, [Validators.required]],
        Office_Number_2: [data.Office_Number_2, [Validators.required]],
        Email_id_2: [data.Email_id_2, [Validators.required]],
        Location_2: [data.Location_2, [Validators.required]]
       })      
    })  
   }

  /* Reactive book form */
  submitBookForm() {
    this.studentForm = this.fb.group({
      client_name: ['', [Validators.required]],
      primary_email: ['', [Validators.required]],
      website: ['', [Validators.required]],
      location: ['', [Validators.required]],
      address: ['', [Validators.required]],
      Contact_Person_Name_1: ['', [Validators.required]],
      Mobile_Number_1: ['', [Validators.required]],
      Office_Number_1: ['', [Validators.required]],
      Email_id_1: ['', [Validators.required]],
      Location_1: [''],
      Contact_Person_Name_2: ['', [Validators.required]],
      Mobile_Number_2: ['', [Validators.required]],
      Office_Number_2: ['', [Validators.required]],
      Email_id_2: ['', [Validators.required]],
      Location_2: [''],
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

  /* Submit book */
  submitStudentForm() {
    console.log(this.studentForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.studentApi.UpdateClient(id, this.studentForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/clients-list'))
      });
    }
  }

}