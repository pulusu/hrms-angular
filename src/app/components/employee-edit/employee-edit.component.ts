import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
//import * as $ from 'jquery';// import Jquery here 

export interface bloodgroup{
  value: string;
  viewValue: string;
}
export interface employee{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
isLinear = true;
private isButtonVisible = false;
	data:any;
public birthdate:Date;
public birthdate1:Date;
public age: number;
public age1: number;
public age2: number;
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
  isLoadingResults = false;
  employeelist;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  previewImagePath:any;
  statusdata;
  currentTrackUser;
  pic:any;
  tempdeparment_Result;
  carrier_Result;
  tempEmp_Result;
  emp_Result;
   firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;
   thirdFormGroup: FormGroup;
   fourthFormGroup: FormGroup;
  constructor(private router: Router, private actRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,private http: HttpClient) {
      this.departmentsSelect();
      this.EmployeeSelect(); 
      //this.maritalStatus(); 
         this.data = {};
         this.data.age = '';
         this.birthdate=this.birthdate;	  
      
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.http.get(`${environment.api_url}`+`${environment.employee_details}`+'/'+id).subscribe((datareturn:any)=>{
      console.log('emp-data',datareturn)
      var data =datareturn[0];
      this.cardImageBase64= data.employee_profie_pic;
      this.firstFormGroup = this._formBuilder.group({
        employee_name: [data.employee_name, [Validators.required]],
    		employee_last_name: [data.employee_last_name, [Validators.required]],
        employee_personal_email : [data.employee_personal_email, Validators.required],
        employee_gender : [data.employee_gender],
		    employee_mobile : [data.employee_mobile, Validators.required],
		    employee_alternate_mobile : [data.employee_alternate_mobile],
        employee_blood_group : [data.employee_blood_group],
        employee_dob : [data.employee_dob],
        employee_dob_per_records : [data.employee_dob_per_records],
        employee_gothram : [data.employee_gothram],
        employee_pancard : [data.employee_pancard],
        employee_aadhar_card : [data.employee_aadhar_card],
        employee_uan_number : [data.employee_uan_number],
		
        employee_profie_pic : [data.employee_profie_pic],
       // created_by : [this.currentTrackUser._id]
     });
	 this.secondFormGroup = this._formBuilder.group({
         employee_father_name : [data.employee_father_name, [Validators.required]],
         employee_father_dob : [data.employee_father_dob, [Validators.required]],
         employee_father_age : [data.employee_father_age],
         employee_mother_name : [data.employee_mother_name, [Validators.required]],
         employee_mother_dob : [data.employee_mother_dob, [Validators.required]],
         employee_mother_age : [data.employee_mother_age],
         employee_marital_status : [data.employee_marital_status, [Validators.required]],
         employee_s_h_name : [data.employee_s_h_name, [Validators.required]],
         employee_s_h_dob : [data.employee_s_h_dob, [Validators.required]],
         employee_s_h_age : [data.employee_s_h_age],
         employee_child_1 : [data.employee_child_1],
         employee_child1_gender : [data.employee_child1_gender],
         employee_child_1_dob : [data.employee_child_1_dob],
         employee_child_2 : [data.employee_child_2],
         employee_child2_gender : [data.employee_child2_gender],
         employee_child_2_dob : [data.employee_child_2_dob],
         employee_child_3 : [data.employee_child_3],
         employee_child3_gender : [data.employee_child3_gender],
         employee_child_3_dob : [data.employee_child_3_dob],
         employee_child_4 : [data.employee_child_4],
         employee_child4_gender : [data.employee_child4_gender],
         employee_child_4_dob : [data.employee_child_4_dob],
      });

      this.thirdFormGroup = this._formBuilder.group({
		 employee_contact_name : [data.employee_contact_name, [Validators.required]],
		 employee_relationship : [data.employee_relationship, [Validators.required]],
		 employee_emeregency_mobile : [data.employee_emeregency_mobile],
		 employee_com_address : [data.employee_com_address, [Validators.required]],
		 employee_per_address : [data.employee_com_address, [Validators.required]],
      
      });
	 
     this.fourthFormGroup = this._formBuilder.group({
		 employee_id : [data.employee_id, [Validators.required]],
		 employee_access_card : [data.employee_access_card, [Validators.required]],
		 employee_office_email : [data.employee_office_email, [Validators.required]],
		 
		 employee_designation : [data.employee_designation, [Validators.required]],
		 employee_department : [data.department_name, [Validators.required]],
		 employee_reporting_manager : [data.employee_name, [Validators.required]],
		 employee_join_date : [data.employee_join_date, [Validators.required]],
		 employee_shift : [data.employee_shift],
		 employee_job_location : [data.employee_job_location, [Validators.required]],

      });
	  
	  if (data.employee_marital_status == 'Single') {
          this.secondFormGroup.get('employee_s_h_name').disable();
          //this.secondFormGroup.get('data.employee_s_h_name').hide();
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
	 this.secondFormGroup.get('employee_father_dob').valueChanges
  .subscribe(selectedValue => { 
         //alert(selectedValue);
		 if(selectedValue){
			 //alert(selectedValue);
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
    })  
  }


  ngOnInit() {
    this.loadScript('../assets/bundles/libscripts.bundle.js');
    this.loadScript('../assets/bundles/vendorscripts.bundle.js');
    this.loadScript('../assets/bundles/datatablescripts.bundle.js');
    this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
    this.loadScript('../assets/bundles/mainscripts.bundle.js');
    this.loadScript('../assets/js/pages/tables/jquery-datatable.js');
    this.loadScript('../assets/js/pages/ui/dialogs.js');

    this.currentTrackUser = JSON.parse(localStorage.getItem('currentTrackUser'));
    console.log('currentTrackUser',this.currentTrackUser);
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
         'employee_father_name' : [null, Validators.required],
         'employee_father_dob' : [null, Validators.required],
		 'employee_father_age' : [null],
	  
	  'employee_mother_name' : [null, Validators.required],
	  'employee_mother_dob' : [null, Validators.required],
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
    //this.onChanges(); 
  }

  onFormSubmit(form:NgForm) {
	  
    this.isLoadingResults = true;
    var id = this.actRoute.snapshot.paramMap.get('id');

//this.employeeForm.value.created_by=this.currentTrackUser._id;
let firstArray = this.firstFormGroup.value;
let secondArray = this.secondFormGroup.value;
let thirdArray = this.thirdFormGroup.value;
let fourthArray = this.fourthFormGroup.value;
//let combinedArray1 = firstArray.concat(secondArray)
console.log('firstArray',firstArray)
console.log('secondArray',secondArray)
//console.log('combinedArray1',combinedArray1)
var obj3 = Object.assign({},firstArray, secondArray,thirdArray,fourthArray);  
//obj3.created_by=this.currentTrackUser._id; 
    //console.log("Employee DETAILS-finalsubmit ", this.employeeForm.value);
	
	//this.fourthFormGroup.value.created_by=this.currentTrackUser._id;
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
	
	
	
   this.http.put(`${environment.api_url}`+`${environment.employees_update}`+'/'+id, obj3).subscribe((form:any)=>{
      this.isLoadingResults = false;            
		  this.Message="Employee added Successfully";
		  setTimeout(()=>{
		  this.Message = null;
      this.router.navigate(['/employees-list']);	 
			},1000);          
        }, (err) => {
			//alert(err);
          console.log(err);
          this.isLoadingResults = false;
        });
	}
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




onSelectionChanged({ value }) {
	//alert(value);
    console.log(value);
    if (value === 'Single') {
      this.secondFormGroup.get('employee_s_h_name').disable();
      this.secondFormGroup.get('employee_s_h_name').reset();
	  this.secondFormGroup.get('employee_s_h_dob').disable();
      this.secondFormGroup.get('employee_s_h_dob').reset();
	  this.secondFormGroup.get('employee_s_h_age').disable();
      this.secondFormGroup.get('employee_s_h_age').reset();
      this.secondFormGroup.get('employee_child_1').disable();
      this.secondFormGroup.get('employee_child_1').reset();
      this.secondFormGroup.get('employee_child_2').disable();
      this.secondFormGroup.get('employee_child_2').reset();
      this.secondFormGroup.get('employee_child_3').disable();
      this.secondFormGroup.get('employee_child_3').reset();
      this.secondFormGroup.get('employee_child_4').disable();
      this.secondFormGroup.get('employee_child_4').reset();
      this.secondFormGroup.get('employee_child_1_dob').disable();
      this.secondFormGroup.get('employee_child_1_dob').reset();
      this.secondFormGroup.get('employee_child_2_dob').disable();
      this.secondFormGroup.get('employee_child_2_dob').reset();
      this.secondFormGroup.get('employee_child_3_dob').disable();
      this.secondFormGroup.get('employee_child_3_dob').reset();
      this.secondFormGroup.get('employee_child_4_dob').disable();
      this.secondFormGroup.get('employee_child_4_dob').reset();
      this.secondFormGroup.get('employee_child1_gender').disable();
      //this.secondFormGroup.get('employee_child1_gender').reset();
      this.secondFormGroup.get('employee_child2_gender').disable();
      //this.secondFormGroup.get('employee_child2_gender').reset();
      this.secondFormGroup.get('employee_child3_gender').disable();
      //this.secondFormGroup.get('employee_child3_gender').reset();
      this.secondFormGroup.get('employee_child4_gender').disable();
      //this.secondFormGroup.get('employee_child4_gender').reset();
    } else {
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
	
  }


//onChanges() {
	 //alert("selectedValue");
 
  
 
 
//}



}
