import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.castUser.subscribe(authState => this.isAuthenticated = authState);
  }

  onLogoutClick(){
    this.authenticationService.logout();
    // this.isAuthenticated = this.authenticationService.isAuthenticated;
    this.router.navigate(['/sign-in']);
  }

}
