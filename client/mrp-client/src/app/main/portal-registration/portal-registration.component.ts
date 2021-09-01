import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { CountryAndStateService } from '../service/country-and-state/country-and-state.service';
import * as moment from 'moment';
import { User } from '../interface/user';

@Component({
  selector: 'app-portal-registration',
  templateUrl: './portal-registration.component.html',
  styleUrls: ['./portal-registration.component.css']
})
export class PortalRegistrationComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup({});
  successMessage: string = '';
  errorMessage: string = '';

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDay();
  minDate = moment({year: this.year - 100, month: this.month, day: this.day}).format('YYYY-MM-DD');

  maxDate = moment({year: this.year - 18, month: this.month, day: this.day}).format('YYYY-MM-DD');


  constructor(private authenticationService: AuthenticationService, 
      private router: Router,
      private countryAndStateService: CountryAndStateService) { }

  ngOnInit(): void {
    this.countries = this.countryAndStateService.countries;

    this.signUpForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      addressLine: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      contactDetail: new FormControl('', [Validators.required, Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]),
      panCardNumber: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)]),
    });
  }

  get name() { return this.signUpForm.controls['name']};
  get addressLine() { return this.signUpForm.controls['addressLine']};
  get country() { return this.signUpForm.controls['country']};
  get state() { return this.signUpForm.controls['state']};
  get city() { return this.signUpForm.controls['city']};
  get pinCode() { return this.signUpForm.controls['pinCode']};
  get dateOfBirth() { return this.signUpForm.controls['dateOfBirth']};
  get contactDetail() { return this.signUpForm.controls['contactDetail']};
  get panCardNumber() { return this.signUpForm.controls['panCardNumber']};
  get email() { return this.signUpForm.controls['email']};
  get password() { return this.signUpForm.controls['password']};

  selectCountry() {
    this.states = this.countries.filter((country) => this.country.value === country.country_name)[0].states;
  }

  registerDetail: User = {};

  onSubmitClick(){
    if(this.signUpForm.valid){
      this.registerDetail = {
        id: null,
        name: this.name.value,
        dateOfBirth: this.dateOfBirth.value,
        address: {
          addressLine: this.addressLine.value,
          country: this.country.value,
          state: this.state.value,
          city: this.city.value,
          pinCode: this.pinCode.value
        },
      contactDetail: this.contactDetail.value,
      panCardNumber: this.panCardNumber.value,
      email: this.email.value,
      password: this.password.value
      };
      this.authenticationService.registerMember(this.registerDetail)
        .subscribe((value)=>{
          debugger;
            this.signUpForm.reset();
            this.successMessage = 'Member Registered Successfully!';
            this.errorMessage = '';
        });
      
      //   this.errorMessage = 'Member Already Exist.';
      //   this.successMessage = '';
      // }
    } else{
      this.errorMessage = 'Invalid Form Submission';
      this.successMessage = '';
    }
  }

}
