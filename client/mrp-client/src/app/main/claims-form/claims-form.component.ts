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
      memberId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      dateOfAdmission: new FormControl('', [Validators.required]),
      dateOfDischarge: new FormControl('', [Validators.required]),
      billAmount: new FormControl('', [Validators.required]),
      dependentId: new FormControl('')
    });
  }

  get memberId() { return this.claimForm.controls['memberId']};
  get name() { return this.claimForm.controls['name']};
  get dateOfBirth() { return this.claimForm.controls['dateOfBirth']};
  get dateOfAdmission() { return this.claimForm.controls['dateOfAdmission']};
  get dateOfDischarge() { return this.claimForm.controls['dateOfDischarge']};
  get billAmount() { return this.claimForm.controls['billAmount']};
  get dependentId() { return this.claimForm.controls['dependentId']};

  verifyMemberId(){
    // this.authenticationService.userDetails.forEach((memberDetails) => {
    //   this.memberIds.push(memberDetails.memberId);
    //   this.Members.push(memberDetails);
    //   memberDetails.dependentDetails?.forEach((dependent) =>{
    //     this.memberIds.push(dependent.memberId);
    //     this.Members.push(dependent);
    //   });
    // });

    let selectedMemberId = this.memberIds.filter((mem) => mem === this.memberId.value);

    // let claimSubmittedDetail = this.claimsService.claimsDetails.filter((claim) => claim.memberId === this.memberId.value)

    if(selectedMemberId.length > 0) {
      // if (claimSubmittedDetail.length === 0) {
        this.errorMessage = '';
        this.isValidMemberId = true;
        let claimMember = this.Members.filter((member) => member?.memberId === selectedMemberId[0]);

        this.memberId.setValue(claimMember[0].memberId);
        this.name.setValue(claimMember[0].name);
        this.dateOfBirth.setValue(claimMember[0].dateOfBirth);
      } else {
        this.errorMessage = 'Claims already submitted...';
        this.successMessage = '';

      }

    // } else {
      this.errorMessage = 'Member Not Found';
      this.successMessage = '';
    // }
  }

  onSubmitClick(){
    if(this.claimForm.valid){
      this.claimsService.addClaims(this.claimForm.value);
      this.claimForm.reset();
      this.isValidMemberId = false;
      this.successMessage = 'Claims added successfully';
      this.errorMessage = '';
    }
  }

}
