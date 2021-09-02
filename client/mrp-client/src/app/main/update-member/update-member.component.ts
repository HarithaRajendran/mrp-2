import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { CountryAndStateService } from '../service/country-and-state/country-and-state.service';
import * as moment from 'moment';
import { Dependent } from '../interface/dependent';
import { UserDetail } from '../interface/user-detail';

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
  currentUser: UserDetail = {};

  allDependentDetailId: any[] = [];
  greaterId: number = 1;

  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDay();
  minDate = moment({ year: this.year - 100, month: this.month, day: this.day }).format('YYYY-MM-DD');

  maxDate = moment({ year: this.year - 18, month: this.month, day: this.day }).format('YYYY-MM-DD');


  constructor(private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private countryAndStateService: CountryAndStateService) { }

  ngOnInit(): void {
    this.setFormValue();
  }

  get id() { return this.updateForm.controls['id'] }
  get name() { return this.updateForm.controls['name'] };
  get addressLine() { return this.updateForm.controls['addressLine'] };
  get country() { return this.updateForm.controls['country'] };
  get state() { return this.updateForm.controls['state'] };
  get city() { return this.updateForm.controls['city'] };
  get pinCode() { return this.updateForm.controls['pinCode'] };
  get dateOfBirth() { return this.updateForm.controls['dateOfBirth'] };
  get contactDetail() { return this.updateForm.controls['contactDetail'] };
  get panCardNumber() { return this.updateForm.controls['panCardNumber'] };
  get email() { return this.updateForm.controls['email'] };
  get password() { return this.updateForm.controls['password'] };

  getDependentControl() {
    return (<FormArray>this.updateForm.get('dependentDetails')).controls;
  }

  setFormValue() {
    this.currentUser = this.authenticationService.currentUser;

    this.countries = this.countryAndStateService.countries;
    this.states = this.countries.filter((country) => this.currentUser.user?.address?.country === country.country_name)[0].states;

    this.updateForm = new FormGroup({
      id: new FormControl(this.currentUser.user?.id),
      name: new FormControl(this.currentUser.user?.name, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      addressLine: new FormControl(this.currentUser.user?.address?.addressLine, [Validators.required]),
      country: new FormControl(this.currentUser.user?.address?.country, [Validators.required]),
      state: new FormControl(this.currentUser.user?.address?.state, [Validators.required]),
      city: new FormControl(this.currentUser.user?.address?.city, [Validators.required]),
      pinCode: new FormControl(this.currentUser.user?.address?.pinCode, [Validators.required]),
      dateOfBirth: new FormControl(this.currentUser.user?.dateOfBirth, [Validators.required]),
      contactDetail: new FormControl(this.currentUser.user?.contactDetail, [Validators.required, Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]),
      panCardNumber: new FormControl(this.currentUser.user?.panCardNumber, [Validators.required, Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]),
      email: new FormControl(this.currentUser.user?.email, [Validators.required, Validators.email]),
      password: new FormControl(this.currentUser.user?.password, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)]),
      dependentDetails: this.fb.array([])
    });

    this.currentUser?.dependents?.forEach((detail: any, i: number) => {
      this.addItemData(detail);
    });
  }

  selectCountry() {
    this.states = this.countries.filter((country) => this.country.value === country.country_name)[0].states;
    this.state.setValue('');
  }

  dependentDetails: FormArray = new FormArray([]);

  isFilled: boolean = false;
  isNew: boolean = true;

  addItem() {
    debugger;
    this.dependentDetails = this.updateForm.get('dependentDetails') as FormArray;
    this.dependentDetails.push(this.fb.group({
      id: [null],
      name: [''],
      dateOfBirth: [''],
      userId: ['']
    }));
  }

  addItemData(dependentDetail: Dependent) {
    this.isFilled = true;
    this.dependentDetails = this.updateForm.get('dependentDetails') as FormArray;
    this.dependentDetails.push(this.fb.group({
      id: [dependentDetail.id],
      name: [dependentDetail.name],
      dateOfBirth: [dependentDetail.dateOfBirth],
      userId: [dependentDetail.userId]
    }));
  }

  idsToRemove: string[] = [];

  remove(i: number) {
    this.idsToRemove.push(this.dependentDetails.at(i).get('id')?.value);
    if(this.dependentDetails.at(i).get('id')?.value){
      this.idsToRemove.push(this.dependentDetails.at(i).get('id')?.value);
    }
    this.dependentDetails.removeAt(i);
  }

  onCancelClick(){
    this.idsToRemove = [];
    this.setFormValue();
  }

  userDetailToUpdate: UserDetail = {};

  onSubmitClick() {
    if (this.updateForm.valid) {
      this.userDetailToUpdate = {
        user: {
          id: this.id.value,
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
        },
        dependents: this.dependentDetails.value,
        idsToDetele: this.idsToRemove
      }
      this.authenticationService.updateMember(this.userDetailToUpdate?.user?.id, this.userDetailToUpdate)
        .subscribe((value: UserDetail) => {
          debugger;
          this.authenticationService.currentUser = value;
          this.currentUser = value;
          this.setFormValue();
          this.successMessage = 'Updated Successfully!';
          this.errorMessage = '';
        });
    } else {
      this.errorMessage = 'Invalid Form Submission';
      this.successMessage = '';
    }
  }

}
