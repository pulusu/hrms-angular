import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-social-media-links',
  templateUrl: './social-media-links.component.html',
  styleUrls: ['./social-media-links.component.css']
})
export class SocialMediaLinksComponent implements OnInit {

currentTrackUser;
teamForm: FormGroup;
isLoadingResults;
Message;
imageError: string;
isImageSaved: boolean;
cardImageBase64: string;
previewImagePath:any;


constructor(private router: Router, private formBuilder: FormBuilder,private http: HttpClient) { }

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
 const reg = '(https?:\/\/){0,1}(www\.){0,1}facebook\.com/\/(?:(?:\w\.)*#!\/)';
 this.teamForm = this.formBuilder.group({
   'title' : [null, [Validators.required]],
   'linkedin' : [null, Validators.required],
   'twitter' : [null, Validators.required],
   'facebook' : [null, Validators.required],
   'team_image' : [null]
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
onFormSubmit(form:NgForm) {
    this.http.post(`${environment.api_url}`+`${environment.send_social_links}`, this.teamForm.value).subscribe((datasubmit:any)=>{
    this.isLoadingResults = false;            
    this.Message="Send Successfully";
    setTimeout(()=>{
		  this.Message = null;
      this.router.navigate(['/dashboard']);	 
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
