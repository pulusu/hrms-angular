import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-hr-social-media',
  templateUrl: './hr-social-media.component.html',
  styleUrls: ['./hr-social-media.component.css']
})
export class HrSocialMediaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  this.loadScript('../assets/bundles/libscripts.bundle.js');
  this.loadScript('../assets/bundles/vendorscripts.bundle.js');
  this.loadScript('../assets/bundles/datatablescripts.bundle.js');
  this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
  this.loadScript('../assets/bundles/mainscripts.bundle.js');
  this.loadScript('https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v5.0&appId=348054355943008&autoLogAppEvents=1');
  this.loadScript('http://platform.twitter.com/widgets.js');

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

}
