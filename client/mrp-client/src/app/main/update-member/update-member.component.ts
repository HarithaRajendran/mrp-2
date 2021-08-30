import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { CountryAndStateService } from '../service/country-and-state/country-and-state.service';
import * as moment from 'moment';
import { DependentDetailI } from '../interface/dependent-detail';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.css']
})
export class UpdateMemberComponent implements OnInit {

  updateForm: FormGroup = new FormGroup({});
  successMessage: string = '';
  errorMessage: string = '';

  countries: any[] = [];
  states: any[] = [];
  user: any;

  allDependentDetailId: any[] = [];
  greaterId: number = 1;

  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDay();
  minDate = moment({year: this.year - 100, month: this.month, day: this.day}).format('YYYY-MM-DD');

  maxDate = moment({year: this.year - 18, month: this.month, day: this.day}).format('YYYY-MM-DD');


  constructor(private authenticationService: AuthenticationService, 
      private router: Router,
      private fb: FormBuilder,
      private countryAndStateService: CountryAndStateService) { }

  ngOnInit(): void {
    let currentUser = [];
    const email = localStorage.getItem('username');
    currentUser = this.authenticationService.userDetails.filter((user) => user.email === email);

    let currentUserDetail = currentUser[0];
    this.user = currentUser[0].dependentDetails;
 
    // To generate dependent id - separating the ids as numbers
    this.authenticationService.userDetails.forEach((user) => {
      user.dependentDetails?.forEach((dependent)=> {
        this.allDependentDetailId.push(dependent.memberId?.split('-')[1] as any as number);
      });
    });

    // if(this.allDependentDetailId.length){
      this.greaterId = this.allDependentDetailId.reduce((a, b) => Math.max(a, b));
    // }

    this.countries = this.countryAndStateService.countries;
    this.states = this.countries.filter((country) => currentUserDetail.country === country.country_name)[0].states;

    this.updateForm = new FormGroup({
      memberId: new FormControl(currentUserDetail.memberId),
      name: new FormControl(currentUserDetail.name, [Validators.required]),
      address: new FormControl(currentUserDetail.address, [Validators.required]),
      country: new FormControl(currentUserDetail.country, [Validators.required]),
      state: new FormControl(currentUserDetail.state, [Validators.required]),
      city: new FormControl(currentUserDetail.city, [Validators.required]),
      pincode: new FormControl(currentUserDetail.pincode, [Validators.required]),
      dateOfBirth: new FormControl(currentUserDetail.dateOfBirth, [Validators.required]),
      age: new FormControl('18', [Validators.required]),
      contactNumber: new FormControl(currentUserDetail.contactNumber, [Validators.required, Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]),
      panNumber: new FormControl(currentUserDetail.panNumber, [Validators.required, Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]),
      email: new FormControl(currentUserDetail.email, [Validators.required, Validators.email]),
      password: new FormControl(currentUserDetail.password, [Validators.required]),
      dependentDetails: this.fb.array([])
    });

    if(this.user.length > 0){
      this.user.forEach((detail: any, i: number) =>{
        this.addItemData(detail);
      });
    }
  }

  get memberId() { return this.updateForm.controls['memberId']} 
  get name() { return this.updateForm.controls['name']};
  get address() { return this.updateForm.controls['address']};
  get country() { return this.updateForm.controls['country']};
  get state() { return this.updateForm.controls['state']};
  get city() { return this.updateForm.controls['city']};
  get pincode() { return this.updateForm.controls['pincode']};
  get dateOfBirth() { return this.updateForm.controls['dateOfBirth']};
  get age() { return this.updateForm.controls['age']};
  get contactNumber() { return this.updateForm.controls['contactNumber']};
  get panNumber() { return this.updateForm.controls['panNumber']};
  get email() { return this.updateForm.controls['email']};
  get password() { return this.updateForm.controls['password']};
  // get dependentDetails() { return (this.updateForm.controls['dependentDetails'] as FormArray);}

  getDependentControl() {
      return (<FormArray>this.updateForm.get('dependentDetails')).controls;
  }
  
  selectCountry() {
    this.states = this.countries.filter((country) => this.country.value === country.country_name)[0].states;
  }

  dependentDetails: FormArray = new FormArray([]);

  isFilled: boolean = false;
  isNew: boolean = true;

  addItem() {
    debugger;
    this.dependentDetails = this.updateForm.get('dependentDetails') as FormArray;
    this.dependentDetails.push(this.fb.group({
      memberId: [`D-${+this.greaterId+1}`],
      name: [''],
      dateOfBirth: ['']
    }));
  }


  addItemData(depentDetail: DependentDetailI) {
    debugger;
    this.isFilled = true;
    this.dependentDetails = this.updateForm.get('dependentDetails') as FormArray;
    this.dependentDetails.push(this.fb.group({
      memberId: [depentDetail.memberId],
      name: [depentDetail.name],
      dateOfBirth: [depentDetail.dateOfBirth]
    }));
  }

  remove(i: number){
    this.greaterId = this.greaterId-1;
    this.dependentDetails.removeAt(i);
  }

  onSubmitClick(){
    if(this.updateForm.valid){
      debugger;
      let result = this.authenticationService.updateMember(this.updateForm.value);
      if(result){
        this.successMessage = 'Updated Successfully!';
        this.errorMessage = '';
      }
    } else{
      this.errorMessage = 'Invalid Form Submission';
      this.successMessage = '';
    }
  }

}
