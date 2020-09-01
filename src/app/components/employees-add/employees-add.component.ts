import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router';
import { FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import * as $ from 'jquery';// import Jquery here 

export interface bloodgroup{
  value: string;
  viewValue: string;
}
export interface employee{
  value: string;
  viewValue: string;
}
declare var CKEDITOR: any;
@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.css']
})
export class EmployeesAddComponent implements OnInit {
isLinear = true;
private isButtonVisible = false;
data:any;
public birthdate:Date;
public birthdate1:Date;
public birthdate2:Date;
public age: number;
public age1: number;
public age2: number;
//public age: number;
bloodgroups: bloodgroup[] = [
    {value: 'A+', viewValue: 'A+'},
    {value: 'A-', viewValue: 'A-'},
    {value: 'B+', viewValue: 'B+'},
    {value: 'B-', viewValue: 'B-'},
    {value: 'O+', viewValue: 'O+'},
    {value: 'O-', viewValue: 'O-'},
    {value: 'AB+', viewValue: 'AB+'},
    {value: 'AB-', viewValue: 'AB-'}
  ];
employees: employee[] = [
    {value: 'Single', viewValue: 'Single'},
    {value: 'Married', viewValue: 'Married'}
];
locations: bloodgroup[] = [
    {value: 'USA', viewValue: 'USA'},
    {value: 'Hyderabad', viewValue: 'Hyderabad'},
    {value: 'Vizag', viewValue: 'Vizag'}
    
  ];
 employeeForm: FormGroup;
  Message:string='';
  Message1:string='';
  Message2:string='';
  isLoadingResults = false;
  employeelist;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  previewImagePath:any;
  statusdata;
  currentTrackUser;
  tempdeparment_Result;
  carrier_Result;
  tempEmp_Result;
  emp_Result;
 //title = 'materialApp';   
   firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;
   thirdFormGroup: FormGroup;
   fourthFormGroup: FormGroup;
   constructor(private router: Router,private _formBuilder: FormBuilder, private http: HttpClient) {
	   this.departmentsSelect();
         this.EmployeeSelect();
		 this.data = {};
         this.data.age = '';
         this.birthdate=this.birthdate;
   }
   ngOnInit() {
	   
	    this.loadScript('../assets/bundles/libscripts.bundle.js');
     this.loadScript('../assets/bundles/vendorscripts.bundle.js');
     this.loadScript('../assets/bundles/datatablescripts.bundle.js');
     this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
     this.loadScript('../assets/bundles/mainscripts.bundle.js');
     this.loadScript('../assets/js/pages/tables/jquery-datatable.js');
     this.loadScript('../assets/js/pages/ui/dialogs.js');

     	 // Start Form Validations //
    this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));
	   
	         this.firstFormGroup = this._formBuilder.group({
         'employee_name': [null, Validators.required],
         'employee_last_name': [null, Validators.required],
         'employee_mobile': [null, Validators.required],
         'employee_alternate_mobile': [null],
         'employee_personal_email': [null, Validators.required],
         'employee_gender': [null, Validators.required],
         'employee_blood_group': [null, Validators.required],
         'employee_dob': [null, Validators.required],
         'employee_dob_per_records': [null, Validators.required],
         'employee_gothram': [null, Validators.required],
         'employee_pancard': [null],
         'employee_aadhar_card': [null, Validators.required],
         'employee_uan_number': [null],
		 'employee_profie_pic' : [null],
      });
      this.secondFormGroup = this._formBuilder.group({
         'employee_father_name' : [null],
         'employee_father_dob' : [null],
		 'employee_father_age' : [null],
	  
	  'employee_mother_name' : [null],
	  'employee_mother_dob' : [null],
	  'employee_mother_age' : [null],
	  'employee_marital_status' : [null, Validators.required],
	  'employee_s_h_name' : [null, Validators.required],
	  'employee_s_h_dob' : [null, Validators.required],
	  'employee_s_h_age' : [null],
	  'employee_child_1' : [null],
	  'employee_child1_gender' : [null],
	  'employee_child_1_dob' : [null],
	  'employee_child_2' : [null],
	  'employee_child2_gender' : [null],
	  'employee_child_2_dob' : [null],
	  'employee_child_3' : [null],
	  'employee_child3_gender' : [null],
	  'employee_child_3_dob' : [null],
	  'employee_child_4' : [null],
	  'employee_child4_gender' : [null],
	  'employee_child_4_dob' : [null],
      });
	  
      this.thirdFormGroup = this._formBuilder.group({
         'employee_contact_name' : [null, Validators.required],
	  'employee_relationship' : [null, Validators.required],
	  'employee_emeregency_mobile' : [null, Validators.required],
	  'employee_com_address' : [null, Validators.required],
	  'employee_per_address' : [null, Validators.required],
      });
      
      this.fourthFormGroup = this._formBuilder.group({
        'employee_id' : [null, Validators.required],
	  'employee_access_card' : [null, Validators.required],
	  'employee_office_email' : [null, Validators.required],
	  'employee_designation' : [null, Validators.required],
	  'employee_department' : [null, Validators.required],
	  'employee_reporting_manager' : [null, Validators.required],
	  'employee_join_date' : [null, Validators.required],
	  'employee_shift' : [null, Validators.required],
	  'employee_job_location' : [null, Validators.required],
      });
    this.onChanges();
   
   }
   
    onFormSubmit() {
    this.isLoadingResults = true;

 //  this.employeeForm.value.created_by=this.currentTrackUser._id;
   
let firstArray = this.firstFormGroup.value;
let secondArray = this.secondFormGroup.value;
let thirdArray = this.thirdFormGroup.value;
let fourthArray = this.fourthFormGroup.value;
//let combinedArray1 = firstArray.concat(secondArray)
console.log('firstArray',firstArray)
console.log('secondArray',secondArray)
//console.log('combinedArray1',combinedArray1)
var obj3 = Object.assign({},firstArray, secondArray,thirdArray,fourthArray);  
obj3.created_by=this.currentTrackUser._id; 
  
  this.fourthFormGroup.value.created_by=this.currentTrackUser._id;
    console.log('this.fourthFormGroup.value',this.fourthFormGroup.value)

    console.log(this.fourthFormGroup.value.employee_department._id)
    console.log(this.fourthFormGroup.value.employee_reporting_manager._id)
	
    if(this.fourthFormGroup.value.employee_department._id == undefined){

      this.fourthFormGroup.value.employee_department = '';
      this.Message="Please select valid Department";
  	 
    }
	else if(this.fourthFormGroup.value.employee_reporting_manager._id == undefined){
		this.fourthFormGroup.value.employee_reporting_manager = '';
		this.Message="Please select valid Reporting Manager";
      
	}
	else{
            this.fourthFormGroup.value.department_head=this.fourthFormGroup.value.employee_department._id;
            //this.fourthFormGroup.value.department_head=this.fourthFormGroup.value.employee_reporting_manager._id;
  
  this.http.post(`${environment.api_url}`+`${environment.employee_add}`, obj3).subscribe((form:any)=>{
      this.isLoadingResults = false;            
      this.Message2="Employee added Successfully";
      const mailData={}; 
      mailData['subject']='Welcome To Kairos Technologies'; 
      mailData['from_mail']=this.currentTrackUser.employee_office_email; 
      mailData['to_mail']=form.employee_office_email;
      mailData['text'] ='Hi '+form.employee_name+', <br> <p>Your Login Deatils For Our office Portal</p><p><b>User Name </b>:'+form.employee_office_email+'</p><p><b>Password </b>:'+form.employee_id+'</p>';
      this.sentMail(mailData);

		  setTimeout(()=>{
			  console.log('formdata',form)
		    this.Message = null;
			this.router.navigate(['/employees-list']);	 
			},1000);          
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
	}
	
	
	
  }
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

      
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                     this.previewImagePath = imgBase64Path;
                     console.log('this.previewImagePath',this.previewImagePath)
                     this.firstFormGroup.get('employee_profie_pic').setValue(this.previewImagePath);
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
}
public loadScript(url: string) {
  const body = <HTMLDivElement> document.body;
  const script = document.createElement('script');
  script.innerHTML = '';
  script.src = url;
  script.async = false;
  script.defer = true;
  body.appendChild(script);
}
departmentsSelect(){
  let obs=this.http.get(`${environment.api_url}`+`${environment.departments_list}`)
  obs.subscribe((carrier_Result:any)=>{ 
    this.tempdeparment_Result = carrier_Result;
    console.log('this.tempdeparment_Result',this.tempdeparment_Result)
    this.suggest_carrier('');
  });
}
suggest_carrier(department_name){
  this.carrier_Result = this.tempdeparment_Result.filter(response => response.department_name.toLowerCase().startsWith(department_name.toLowerCase())).slice(0, 3);
}
displayFn(country): string {
  return country ? country.department_name : country;
}  


displayFnemp(emp): string {
  return emp ? emp.employee_name : emp;
}  
EmployeeSelect(){
  let obs=this.http.get(`${environment.api_url}`+`${environment.employees_list}`)
  obs.subscribe((emp_Result:any)=>{ 
    this.tempEmp_Result = emp_Result;
    console.log('this.tempEmp_Result',this.tempEmp_Result)
    this.suggest_manager('');
  });
}
suggest_manager(employee_name){
  this.emp_Result = this.tempEmp_Result.filter(response => response.employee_name.toLowerCase().startsWith(employee_name.toLowerCase())).slice(0, 3);
}

onChanges() {
  this.secondFormGroup.get('employee_marital_status').valueChanges
  .subscribe(selectedValue => {
	  //alert(selectedValue);
      if (selectedValue == 'Single') {
          this.secondFormGroup.get('employee_s_h_name').disable();
          this.secondFormGroup.get('employee_s_h_dob').disable();
          this.secondFormGroup.get('employee_s_h_age').disable();
          this.secondFormGroup.get('employee_child_1').disable();
          this.secondFormGroup.get('employee_child_2').disable();
          this.secondFormGroup.get('employee_child_3').disable();
          this.secondFormGroup.get('employee_child_4').disable();
          this.secondFormGroup.get('employee_child_1_dob').disable();
          this.secondFormGroup.get('employee_child_1_dob').disable();
          this.secondFormGroup.get('employee_child_2_dob').disable();
          this.secondFormGroup.get('employee_child_3_dob').disable();
          this.secondFormGroup.get('employee_child_4_dob').disable();
          this.secondFormGroup.get('employee_child1_gender').disable();
          this.secondFormGroup.get('employee_child2_gender').disable();
          this.secondFormGroup.get('employee_child3_gender').disable();
          this.secondFormGroup.get('employee_child4_gender').disable();		  
      }
      else {
          this.secondFormGroup.get('employee_s_h_name').enable();
          this.secondFormGroup.get('employee_s_h_dob').enable();
          this.secondFormGroup.get('employee_s_h_age').enable();
          this.secondFormGroup.get('employee_child_1').enable();
          this.secondFormGroup.get('employee_child_2').enable();
          this.secondFormGroup.get('employee_child_3').enable();
          this.secondFormGroup.get('employee_child_4').enable();
          this.secondFormGroup.get('employee_child_1_dob').enable();
          this.secondFormGroup.get('employee_child_2_dob').enable();
          this.secondFormGroup.get('employee_child_3_dob').enable();
          this.secondFormGroup.get('employee_child_4_dob').enable();
          this.secondFormGroup.get('employee_child1_gender').enable();
          this.secondFormGroup.get('employee_child2_gender').enable();
          this.secondFormGroup.get('employee_child3_gender').enable();
          this.secondFormGroup.get('employee_child4_gender').enable();		  
      }
  });
 this.secondFormGroup.get('employee_father_dob').valueChanges
  .subscribe(selectedValue => { 
         //alert(selectedValue);
		 if(selectedValue){
		 var timeDiff = Math.abs(Date.now() - selectedValue.getTime());
         this.age = Math.ceil(timeDiff / (1000 * 3600 * 24) / 365.25);
		 }
  });
  this.secondFormGroup.get('employee_mother_dob').valueChanges
  .subscribe(selectedValue => { 
         //alert(selectedValue);
		 if(selectedValue){
		 var timeDiff = Math.abs(Date.now() - selectedValue.getTime());
         this.age1 = Math.ceil(timeDiff / (1000 * 3600 * 24) / 365.25);
		 }
  });
  this.secondFormGroup.get('employee_s_h_dob').valueChanges
  .subscribe(selectedValue => { 
         //alert(selectedValue);
		 if(selectedValue){
		 var timeDiff = Math.abs(Date.now() - selectedValue.getTime());
         this.age2 = Math.ceil(timeDiff / (1000 * 3600 * 24) / 365.25);
		 }
  });
  
}



sentMail(mailData) {

  this.http.post(`${environment.api_url}`+`${environment.sendMail}`, mailData).subscribe((sentmaildata:any)=>{
  this.isLoadingResults = false;
  console.log('sentmaildata',sentmaildata)            
  setTimeout(()=>{
  this.Message = null;
  },1000);          
    }, (err) => {
      console.log(err);
    });

}

}
