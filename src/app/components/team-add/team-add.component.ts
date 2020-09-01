import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

export interface team{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.css']
})
export class TeamAddComponent implements OnInit {



teams: team[] = [
    {value: 'RPL', viewValue: 'RPL'},
    {value: 'SPL', viewValue: 'SPL'}
  ];
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  previewImagePath:any;
  currentTrackUser;
  tempcarrier_Result;
  carrier_Result;
  team_head_name;
  teamForm: FormGroup;
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

   this.teamForm = this.formBuilder.group({
     'team_name' : [null, Validators.required],
     'team_type' : [null, Validators.required],
     'team_head_name' : [null, Validators.required],
     'team_image' : [null, Validators.required],
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
    this.teamForm.value.created_by=this.currentTrackUser._id;
    console.log('this.teamForm.value',this.teamForm.value)

    console.log(this.teamForm.value.team_head_name._id)
    if(this.teamForm.value.team_head_name._id == undefined){

      this.teamForm.value.team_head_name = '';
      this.Message="Please select valid employee";
	 // this.team_head_name.reset();
    }else{
            this.teamForm.value.department_head=this.teamForm.value.team_head_name._id;
      this.http.post(`${environment.api_url}`+`${environment.emp_teams_add}`, this.teamForm.value).subscribe((datasubmit:any)=>{
      this.isLoadingResults = false;            
      this.Message="Team added Successfully";
		  setTimeout(()=>{
		  this.Message = null;
      this.router.navigate(['/teams-list']);	 
			},500); 
			
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
                     this.teamForm.get('team_image').setValue(this.previewImagePath);
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

}

