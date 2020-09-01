import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  eventsForm: FormGroup;
  Message:string='';
  isLoadingResults = false;
  eventslist;
  eventdate;
  currentTrackAdmin;
  isAdmin;
 
  constructor(private router: Router, private formBuilder: FormBuilder,private http: HttpClient) { }

  ngOnInit() {

    this.onloadevents();

    this.loadScript('../assets/bundles/libscripts.bundle.js');
    this.loadScript('../assets/bundles/vendorscripts.bundle.js');
    this.loadScript('../assets/js/fullcalendarscripts.bundle.js');

    this.loadScript('../assets/js/fullcalendar.js');
    this.loadScript('../assets/js/toastr.js');
    this.loadScript('../assets/js/chartist.bundle.js');
    this.loadScript('../assets/js/knob.bundle.js');
	
    this.loadScript('../assets/js/mainscripts.bundle.js');
    this.loadScript('../assets/js/calendar.js');
    this.loadScript('../assets/js/index.js');
    this.currentTrackAdmin = localStorage.getItem('hrms-currentTrack-admin');
    if(this.currentTrackAdmin=='true'){
      this.isAdmin=true;
    }	 
	 // Start Form Validations //
	 
	  this.eventsForm = this.formBuilder.group({
      'event_date' : [null, Validators.required],
      'event_name' : [null, Validators.required],
      'event_location' : [null, Validators.required],
      'event_description' : [null, Validators.required],
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
 onloadevents() {
	  this.http.get(`${environment.api_url}`+`${environment.events_list}`).subscribe((form:any)=>{
             console.log("events_list", form);
       this.eventslist=form;
       localStorage.setItem('calander-events', JSON.stringify(this.eventslist));
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    form['event_date']=this.eventdate;
	console.log("PRODUCT DETAILS", form);
	//form.created_by = 1; 
   this.http.post(`${environment.api_url}`+`${environment.events_add}`, form).subscribe((form:any)=>{
             console.log("eventsForm", form);
          this.isLoadingResults = false;            
		  this.Message="Event  added Successfully";
		  setTimeout(()=>{
		  this.Message = null;
		  document.getElementById('close-modal-events').click();		   
		  this.eventsForm.reset();
      this.onloadevents();
      this.loadScript('../assets/js/calendar.js');
      this.router.navigate(['/events']);	 
			},1000);          
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
	
  } 
  
  onChangePickupdate(event){
    var d = new Date(event);
      let date  = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();;
      this.eventdate=date;
    } 
}
