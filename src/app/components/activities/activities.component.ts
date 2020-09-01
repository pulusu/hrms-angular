import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadScript('../assets/bundles/libscripts.bundle.js');
    this.loadScript('../assets/bundles/vendorscripts.bundle.js');
    this.loadScript('../assets/bundles/datatablescripts.bundle.js');
    this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
    this.loadScript('../assets/bundles/mainscripts.bundle.js');
    this.loadScript('../assets/js/pages/tables/jquery-datatable.js');
    this.loadScript('../assets/js/pages/ui/dialogs.js');
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
