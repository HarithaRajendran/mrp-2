import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MemberDetailI } from '../../interface/member-detail';
import { LoginI } from '../../interface/member-login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: boolean = false;

  userDetails: MemberDetailI[] = [
    {
      memberId: 'R-111',
      name: 'Haritha',
      address: 'No.1 abc Street, ambattur',
      country: 'India',
      state: 'Tamil Nadu',
      city: 'Chennai',
      pincode: 600118,
      dateOfBirth: '18-03-1997',
      age: 24,
      contactNumber: '9094828327',
      panNumber: 'ATAPH1234L',
      email: 'haritha@gmail.com',
      password: 'Abc@12345',
      dependentDetails: [
        {memberId: 'D-112',
        name: 'Rajendran',
        dateOfBirth: '16-08-1964'}
      ]
    }
  ]
  
  private isUserAuthenticated = new BehaviorSubject<boolean>(false);
  castUser = this.isUserAuthenticated.asObservable();
   
   changeAuthenticateStatus(stateValue: boolean){
     this.isAuthenticated = stateValue;
     this.isUserAuthenticated.next(stateValue); 
   }

  constructor() { }

  registerMember(userValue: MemberDetailI){
    // Implement the api later once its been created.

    if(this.existingUserCheck(userValue).length === 0){
        let id = 0;
        id = this.userDetails[this.userDetails.length-1].memberId?.split('-')[1] as any as number;
        id = +id+1;
        userValue.memberId = `R-${id}`;
        this.userDetails.push(userValue);
        return true;
      }
      return false;
  }

  updateMember(memberDetail: MemberDetailI): boolean{
    let index = this.userDetails.findIndex(detail => detail.memberId === memberDetail.memberId);
    this.userDetails[index] = memberDetail;
    console.log(this.userDetails);
    return true;
  }
  
  signIn(value: LoginI): boolean{
    if(this.getCurrentUser(value).length !== 0){
      localStorage.setItem('username', value.username);
      localStorage.setItem('password', value.password);
      this.changeAuthenticateStatus(true);
      return true;
      // this.isAuthenticated = true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.changeAuthenticateStatus(false);
  }

  getCurrentUser(userValue: LoginI): MemberDetailI[] {
    let currentUser = [];
    currentUser = this.userDetails.filter(user => 
      user.email === userValue.username && user.password === userValue.password);
    return currentUser;
  }

  existingUserCheck(userValue: MemberDetailI): MemberDetailI[] {
    let currentUser = [];
    currentUser = this.userDetails.filter(user => 
      user.email === userValue.email || user.panNumber === userValue.panNumber);
    return currentUser;
  }
}
