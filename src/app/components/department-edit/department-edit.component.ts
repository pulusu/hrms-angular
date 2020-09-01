import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {

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
    return country ? country.employee_name : country;
  }  
  carrierSelect(){
    let obs=this.http.get(`${environment.api_url}`+`${environment.employees_list}`)
    obs.subscribe((carrier_Result:any)=>{ 
      this.tempcarrier_Result = carrier_Result;
      console.log('this.tempcarrier_Result',this.tempcarrier_Result)
      this.suggest_carrier('');
    });
  }
  suggest_carrier(employee_name){
    this.carrier_Result = this.tempcarrier_Result.filter(response => response.employee_name.toLowerCase().startsWith(employee_name.toLowerCase())).slice(0, 3);
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

    console.log('form',form);
    this.departmentForm.value.created_by=this.currentTrackUser._id;
     this.departmentForm.value.department_head=this.departmentForm.value.department_head_name._id;
    console.log('this.departmentForm.value',this.departmentForm.value)
    this.http.post(`${environment.api_url}`+`${environment.departments_add}`, this.departmentForm.value).subscribe((datasubmit:any)=>{
      this.isLoadingResults = false;            
      this.Message="Department added Successfully";
      console.log('datasubmit',datasubmit)
		  setTimeout(()=>{
		  this.Message = null;
		 // this.departmentForm.reset();
    //  this.router.navigate(['/departments']);	 
			},1000);          
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
    
  }


}
