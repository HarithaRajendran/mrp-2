import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './main/service/authentication/authentication.service';
import { CountryAndStateService } from './main/service/country-and-state/country-and-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    if(username){
      this.authenticationService.isAuthenticated = true;
    }
  }

  title = 'mrp-client';
}
