import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared/employees.api';

@Component({
  selector: 'app-emp-departments',
  templateUrl: './emp-departments.component.html',
  styleUrls: ['./emp-departments.component.css']
})
export class EmpDepartmentsComponent implements OnInit {

  constructor(private empapi: ApiService) {
	this.empapi.GetEmployees().subscribe(data => {
		console.log('slider_info',data)
      
      
    }) 

	}

  ngOnInit() {
	  console.log('ssss');
  }

}
