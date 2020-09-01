import { Client } from './../../shared/client';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  StudentData: any = [];
  dataSource: MatTableDataSource<Client>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [ 'client_name', 'primary_email', 'website','aggrimentfile', 'action'];

  constructor(private studentApi: ApiService) {
    this.studentApi.GetClients().subscribe(data => {
		console.log('datadata',data)
      this.StudentData = data;
      this.dataSource = new MatTableDataSource<Client>(this.StudentData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteStudent(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.studentApi.DeleteClient(e._id).subscribe()
    }
  }

}