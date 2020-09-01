import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-holidays-list',
  templateUrl: './holidays-list.component.html',
  styleUrls: ['./holidays-list.component.css']
})
export class HolidaysListComponent implements OnInit {
  holidayForm: FormGroup;
  carrier:string='';
  Message:string='';
  isLoadingResults = false;
  holidayslist;
  currentTrackAdmin;
  isAdmin;
  constructor(private router: Router, private formBuilder: FormBuilder,private http: HttpClient) {}

  ngOnInit() {
  	 // Start Load JS Files //
	 this.loadScript('../assets/bundles/libscripts.bundle.js');
     this.loadScript('../assets/bundles/vendorscripts.bundle.js');
     this.loadScript('../assets/bundles/datatablescripts.bundle.js');
     this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
     this.loadScript('../assets/bundles/mainscripts.bundle.js');
     this.loadScript('../assets/js/pages/tables/jquery-datatable.js');
     this.loadScript('../assets/js/pages/ui/dialogs.js');
	 
	 // End Load JS Files //
	 
	 this.onloadholiday();
	 
	 // Start Form Validations //
	 
	  this.holidayForm = this.formBuilder.group({
      'holiday_date' : [null, Validators.required],
      'holiday_name' : [null, Validators.required],
      'created_by' : [null]
	  });
    
    this.currentTrackAdmin = localStorage.getItem('hrms-currentTrack-admin');
    if(this.currentTrackAdmin=='true'){
      this.isAdmin=true;
    }
	 // End Form Validations //
	 
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
  onloadholiday() {
	  this.http.get(`${environment.api_url}`+`${environment.holidays_list}`).subscribe((form:any)=>{
             console.log("holidayFormliist", form);
			 this.holidayslist=form;
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
	console.log("PRODUCT DETAILS", form);
	//form.created_by = 1; 
   this.http.post(`${environment.api_url}`+`${environment.holidays_add}`, form).subscribe((form:any)=>{
             console.log("holidayForm", form);
          this.isLoadingResults = false;            
		  this.Message="Holiday added Successfully";
		  setTimeout(()=>{
		  this.Message = null;
		  document.getElementById('close-modal').click();		   
		  this.holidayForm.reset();
		  this.onloadholiday();
	      this.router.navigate(['/holidays']);	 
			},1000);          
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
	
  }
  // Delete Holiday //
  
  deleteHoliday(cid){
	  if(confirm("Are you sure to delete ?")) {
         this.isLoadingResults = true;  
	     this.http.delete<any>(`${environment.api_url}`+`${environment.holiday_delete}`+cid).subscribe((datar)=>{
          this.isLoadingResults = false;  
		  this.Message="Holiday Deleted Successfully";
  		  this.onloadholiday();
		  setTimeout(()=>{
		  this.Message = null;
		   },2000);          
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  
  }
}
