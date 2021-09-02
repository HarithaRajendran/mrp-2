import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ClaimsService } from '../service/claims/claims.service';

@Component({
  selector: 'app-claims-form',
  templateUrl: './claims-form.component.html',
  styleUrls: ['./claims-form.component.css']
})
export class ClaimsFormComponent implements OnInit {

  claimForm: FormGroup = new FormGroup({});

  errorMessage: string = '';
  successMessage: string = '';

  isValidMemberId: boolean = false;
  memberIds: any[] = [];
  Members: any[] = [];

  constructor(private claimsService: ClaimsService, 
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.claimForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      dateOfAdmission: new FormControl('', [Validators.required]),
      dateOfDischarge: new FormControl('', [Validators.required]),
      totalBillAmount: new FormControl('', [Validators.required]),
      memberId: new FormControl('', [Validators.required]),
      userId: new FormControl(this.authenticationService.currentUser.user?.id)
    });
  }

  get id() { return this.claimForm.controls['id']};
  get name() { return this.claimForm.controls['name']};
  get dateOfBirth() { return this.claimForm.controls['dateOfBirth']};
  get dateOfAdmission() { return this.claimForm.controls['dateOfAdmission']};
  get dateOfDischarge() { return this.claimForm.controls['dateOfDischarge']};
  get totalBillAmount() { return this.claimForm.controls['totalBillAmount']};
  get memberId() { return this.claimForm.controls['memberId']};
  get userId() { return this.claimForm.controls['userId']};

  verifyMemberId(){
    this.claimsService.checkClaim(this.memberId.value).subscribe((value: any) =>{
      debugger;
      if(value?.error){
        this.errorMessage = 'Claims already submitted...';
        this.successMessage = '';
      } else if(value?.memberId !== null){
        this.errorMessage = '';
        this.isValidMemberId = true;

        this.memberId.setValue(value.memberId);
        this.name.setValue(value.name);
        this.dateOfBirth.setValue(value.dateOfBirth);
      } else{
        this.errorMessage = 'Member Not Found';
        this.successMessage = '';
      }
    });
  }

  onSubmitClick(){
    if(this.claimForm.valid){
      this.claimsService.addClaims(this.claimForm.value).subscribe((value) =>{
        this.claimForm.reset();
        this.isValidMemberId = false;
        this.successMessage = 'Claims added successfully';
        this.errorMessage = '';
      });
    }
  }

}
