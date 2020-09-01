import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {
  currentTrackUser;
  employess_result;
  emp_tempcountry_result;
  tempcarrier_Result;
  carrier_Result;
  department_head_name;
  departmentForm: FormGroup;
  isLoadingResults;
  Message;

  constructor(private router: Router, private formBuilder: FormBuilder,private http: HttpClient) { }

  ngOnInit() {
    this.loadScript('../assets/bundles/libscripts.bundle.js');
    this.loadScript('../assets/bundles/vendorscripts.bundle.js');
    this.loadScript('../assets/bundles/datatablescripts.bundle.js');
    this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
    this.loadScript('../assets/bundles/mainscripts.bundle.js');
    this.loadScript('../assets/js/pages/tables/jquery-datatable.js');
    this.loadScript('../assets/js/pages/ui/dialogs.js');
    this.carrierSelect();
   // this.headSelect();
 

       // Start Form Validations //
   this.currentTrackUser = JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser'));

   this.departmentForm = this.formBuilder.group({
     'department_name' : [null, Validators.required],
     'department_head_name' : [null, Validators.required],
     'created_by' : [null]
   });
  }
  displayFn(country): string {
    return country ? country.emp_name : country;
  }  
  carrierSelect(){
    let obs=this.http.get(`${environment.api_url}`+`${environment.emp_data_list}`)
    obs.subscribe((carrier_Result:any)=>{ 
      this.tempcarrier_Result = carrier_Result;
      console.log('this.tempcarrier_Result',this.tempcarrier_Result)
      this.suggest_carrier('');
    });
  } 
  suggest_carrier(emp_name){
    this.carrier_Result = this.tempcarrier_Result.filter(response => response.emp_name.toLowerCase().startsWith(emp_name.toLowerCase())).slice(0, 3);
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
  onFormSubmit(form:NgForm) {
    this.departmentForm.value.created_by=this.currentTrackUser._id;
    console.log('this.departmentForm.value',this.departmentForm.value)

    console.log(this.departmentForm.value.department_head_name._id)
    if(this.departmentForm.value.department_head_name._id == undefined){

      this.departmentForm.value.department_head_name = '';
      this.Message="Please select valid employee";
	 // this.department_head_name.reset();
    }else{
            this.departmentForm.value.department_head=this.departmentForm.value.department_head_name._id;
      this.http.post(`${environment.api_url}`+`${environment.departments_add}`, this.departmentForm.value).subscribe((datasubmit:any)=>{
      this.isLoadingResults = false;            
      this.Message="Department added Successfully";
		  setTimeout(()=>{
		  this.Message = null;
      this.router.navigate(['/departments']);	 
			},500); 
			
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });

    }
      
    
  }


}
