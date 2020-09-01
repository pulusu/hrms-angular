import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from './_services'; 
import { Router } from '@angular/router';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  opened = true;
  currentUser: User;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.authenticationService.currentUser);
}
  ngOnInit() {
    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
