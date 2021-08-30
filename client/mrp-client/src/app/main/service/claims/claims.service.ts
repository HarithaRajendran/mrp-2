import { Injectable } from '@angular/core';
import { ClaimsDetailI } from '../../interface/claims-detail';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  claimsDetails: ClaimsDetailI[] = [
    {
      claimId: '1111111111',
      memberId: 'R-111',
      name: 'Haritha',
      dateOfBirth: '18/03/1997',
      dateOfAdmission: '18/05/2021',
      dateOfDischarge: '28/05/2021',
      billAmount: '40000'
    }
  ]

  constructor(private authenticationService: AuthenticationService) { }

  addClaims(claimValue: ClaimsDetailI): boolean {
      let id = 0;
      id = this.claimsDetails[this.claimsDetails.length-1].claimId as any as number;
      id = +id+1;
      claimValue.claimId = id.toString();
      this.claimsDetails.push(claimValue);
      // this.authenticationService.userDetails.indexOf()
      return true;
  }
}
