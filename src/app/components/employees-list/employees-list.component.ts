import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

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
  currentTrackAdmin;
  isAdmin;
  viewemployeeDetails:any;
  //viewemployeeDetails=false;
  loadviewEmp= false;
  // For Pagination 

  
  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;
  show_dialog: boolean= false;
  //loadviewEmp: boolean= false;
//demo:any = true;
 firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;
   thirdFormGroup: FormGroup;
   fourthFormGroup: FormGroup;
  constructor(private router: Router, private _formBuilder: FormBuilder,private http: HttpClient) {
    this.onloadEmployee();
   }
   ngOnInit() {
     this.loadScript('../assets/bundles/libscripts.bundle.js');
     this.loadScript('../assets/bundles/vendorscripts.bundle.js');
     this.loadScript('../assets/bundles/datatablescripts.bundle.js');
     this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
     this.loadScript('../assets/bundles/mainscripts.bundle.js');
     this.loadScript('../assets/js/pages/tables/jquery-datatable.js');
     this.loadScript('../assets/js/pages/ui/dialogs.js');
     this.currentTrackAdmin = localStorage.getItem('hrms-currentTrack-admin');
      if(this.currentTrackAdmin=='true'){
      this.isAdmin=true;
    }
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
 //this.detailsbm2d();
  }
  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;

this.employeeForm.value.created_by=this.currentTrackUser._id;
   this.http.post(`${environment.api_url}`+`${environment.employee_add}`, this.employeeForm.value).subscribe((form:any)=>{
      this.isLoadingResults = false;            
		  this.Message="Employee added Successfully";
		  setTimeout(()=>{
		  this.Message = null;
		  document.getElementById('close-modal-employee').click();		   
		  this.employeeForm.reset();
      this.router.navigate(['/employees-list']);	 
			},1000);          
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
	
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
                     this.employeeForm.get('employee_profie_pic').setValue(this.previewImagePath);
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}
viewEmployee(index: number, e){
  console.log('emp-datsssa',e)
  this.loadviewEmp=false;
  this.show_dialog = false;
  this.http.get(`${environment.api_url}`+`${environment.employee_details}/${e._id}`).subscribe((datareturn:any)=>{
    console.log('emp-data',datareturn)
    this.viewemployeeDetails=datareturn[0];
    this.loadviewEmp=true;
  })  
}
removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
}
onloadEmployee() {
  this.http.get(`${environment.api_url}`+`${environment.employees_list}`).subscribe((form:any)=>{
     this.employeelist=form;
     console.log('employees-list',form)
          }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
}
ActiveEmployee(index: number, e){
  if(window.confirm('Are you sure Active')) {
    var myObj = {};
    myObj['employee_staus'] = 1;
    this.http.put(`${environment.api_url}`+`${environment.employees_update}/${e._id}`, myObj).subscribe((form:any)=>{
    console.log("employeeForm", form);
	
    this.onloadEmployee();
      }, (err) => {
        console.log('err',err);
        this.isLoadingResults = false;
      });
    }
}
InActiveEmployee(index: number, e){
  if(window.confirm('Are you sure Inactive')) {
    var myObj = {};
    myObj['employee_staus'] = 0;
    this.http.put(`${environment.api_url}`+`${environment.employees_update}/${e._id}`, myObj).subscribe((form:any)=>{
    console.log("employeeForm", form);
    this.onloadEmployee();
      }, (err) => {
        console.log('err',err);
        this.isLoadingResults = false;
      });
    }
}
deleteEmployee(index: number, e){
  if(window.confirm('Are you sure')) {
    var myObj = {};
    myObj['employee_profie_pic'] = 3;
    this.http.delete(`${environment.api_url}`+`${environment.employees_delete}/${e._id}`).subscribe((form:any)=>{
    console.log("employeeForm", form);
      this.onloadEmployee();
      }, (err) => {
        console.log('err',err);
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

 toggle() {
	 
    this.show_dialog = !this.show_dialog;
	this.loadviewEmp = !this.loadviewEmp;
  }

}
