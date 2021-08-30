import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-portal-login',
  templateUrl: './portal-login.component.html',
  styleUrls: ['./portal-login.component.css']
})
export class PortalLoginComponent implements OnInit {

  signInForm: FormGroup = new FormGroup({});
  errorMessage: string = '';

  constructor(private authenticationService: AuthenticationService, 
      private router: Router) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]
      ),
      password: new FormControl('', [Validators.required])
    });
  }

  get username() { return this.signInForm.controls['username']};
  get password() { return this.signInForm.controls['password']};

  onSubmitClick(){
    if(this.signInForm.valid){
      let result = this.authenticationService.signIn(this.signInForm.value);
      if(result){
        this.errorMessage = '';
        this.router.navigate(['/profile']);
      } else {
        this.errorMessage = 'User Not Found';
      }
    } else{
      this.errorMessage = 'Invalid Credentials';
    }
  }

}
