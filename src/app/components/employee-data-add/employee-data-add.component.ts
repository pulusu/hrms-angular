import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

export interface locgroup{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-employee-data-add',
  templateUrl: './employee-data-add.component.html',
  styleUrls: ['./employee-data-add.component.css']
})
export class EmployeeDataAddComponent implements OnInit {
	currentTrackUser;
isLoadingResults;
Message;
empForm: FormGroup;
tempdeparment_Result;
carrier_Result;
cardImageBase64;
isImageSaved;
previewImagePath;
imageError;
locations: locgroup[] = [
    {value: '', viewValue: 'Select Location'},
    {value: 'Kairos USA', viewValue: 'Kairos USA'},
    {value: 'Kairos Hyderabad', viewValue: 'Kairos Hyderabad'},
    {value: 'Kairos Vizag', viewValue: 'Kairos Vizag'},
    {value: 'Solunus Hyderabad', viewValue: 'Solunus Hyderabad'},
    {value: 'Solunus Dallas', viewValue: 'Solunus Dallas'}
    
  ];

  constructor(private router: Router, private formBuilder: FormBuilder,private http: HttpClient) { 
    this.departmentsSelect();
  }

  ngOnInit() {
	this.loadScript('../assets/bundles/libscripts.bundle.js');
    this.loadScript('../assets/bundles/vendorscripts.bundle.js');
    this.loadScript('../assets/bundles/datatablescripts.bundle.js');
    this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
    this.loadScript('../assets/bundles/mainscripts.bundle.js');
    this.loadScript('../assets/js/pages/tables/jquery-datatable.js');
    this.loadScript('../assets/js/pages/ui/dialogs.js');
	
	 this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));

   this.empForm = this.formBuilder.group({
	 'emp_id' : [null, Validators.required],
	 'emp_name' : [null, Validators.required],
     'emp_designation' : [null, Validators.required],
     'employee_department' : [null, Validators.required],
     'emp_doj' : [null],
     'emp_mobile' : [null, Validators.required],
     'emp_alt_mobile' : [null],
     'emp_official_email' : [null, Validators.required],
     'emp_personal_email' : [null],
     'emp_actual_dob' : [null, Validators.required],
     'emp_dob_records' : [null],
     'emp_wedding_anniversary' : [null],
     'emp_job_location' : [null, Validators.required],
     'emp_report_manager_mail' : [null, Validators.required],
     'emp_profie_pic':[null],
     'created_by' : [null]
   });
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
                     console.log('this.previewImagePath',this.previewImagePath)
                     this.empForm.get('emp_profie_pic').setValue(this.previewImagePath);
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
  onFormSubmit(form:NgForm) {
    this.empForm.value.created_by=this.currentTrackUser._id;
    console.log('this.empForm.value',this.empForm.value)

    console.log(this.empForm.value.employee_department._id)
    if(this.empForm.value.employee_department._id == undefined){

      this.empForm.value.employee_department = '';
      this.Message="Please select valid Department";
  	 
    }else{
            this.empForm.value.employee_department=this.empForm.value.employee_department._id;
      this.http.post(`${environment.api_url}`+`${environment.emp_data_add}`, this.empForm.value).subscribe((datasubmit:any)=>{
      this.isLoadingResults = false;            
      this.Message="Employee updated Successfully";
		  setTimeout(()=>{
		  this.Message = null;
      this.router.navigate(['/emp-data-list']);	 
			},500); 
			
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });

    }
      
    
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


}
