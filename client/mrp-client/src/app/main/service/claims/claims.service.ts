import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from '../../interface/claim';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  // claimsDetails: Claim[] = [
  //   {
  //     id: 1111111111,
  //     memberId: 'R-111',
  //     name: 'Haritha',
  //     dateOfBirth: '18/03/1997',
  //     dateOfAdmission: '18/05/2021',
  //     dateOfDischarge: '28/05/2021',
  //     billAmount: '40000'
  //   }
  // ]

  constructor(private httpClient: HttpClient) { }

  addClaims(claimValue: Claim) {
    return this.httpClient.post(`http://localhost:8081/api/claim/submit`, claimValue);
      // let id = 0;
      // id = this.claimsDetails[this.claimsDetails.length-1].claimId as any as number;
      // id = +id+1;
      // claimValue.claimId = id.toString();
      // this.claimsDetails.push(claimValue);
      // // this.authenticationService.userDetails.indexOf()
      // return true;
  }

  checkClaim(id: string) {
    return this.httpClient.get(`http://localhost:8081/api/claim/member/check/${id}`);
  }
}
