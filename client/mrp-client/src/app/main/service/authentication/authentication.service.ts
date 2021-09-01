import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../interface/user';
import { Login } from '../../interface/login';
import { UserDetail } from '../../interface/user-detail';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: boolean = false;

  // userDetails: User[] = [
  //   {
  //     memberId: 'R-111',
  //     name: 'Haritha',
  //     address: 'No.1 abc Street, ambattur',
  //     country: 'India',
  //     state: 'Tamil Nadu',
  //     city: 'Chennai',
  //     pincode: 600118,
  //     dateOfBirth: '18-03-1997',
  //     age: 24,
  //     contactNumber: '9094828327',
  //     panNumber: 'ATAPH1234L',
  //     email: 'haritha@gmail.com',
  //     password: 'Abc@12345',
  //     dependentDetails: [
  //       {memberId: 'D-112',
  //       name: 'Rajendran',
  //       dateOfBirth: '16-08-1964'}
  //     ]
  //   }
  // ]

  currentUser: UserDetail = {};
  
  private isUserAuthenticated = new BehaviorSubject<boolean>(false);
  castUser = this.isUserAuthenticated.asObservable();
   
   changeAuthenticateStatus(stateValue: boolean){
     this.isAuthenticated = stateValue;
     this.isUserAuthenticated.next(stateValue); 
   }

  constructor(private httpClient: HttpClient) { }

  registerMember(userValue: User){
    // Implement the api later once its been created.

    // if(this.existingUserCheck(userValue).length === 0){
    //     let id = 0;
    //     id = this.userDetails[this.userDetails.length-1].memberId?.split('-')[1] as any as number;
    //     id = +id+1;
    //     userValue.memberId = `R-${id}`;
    //     this.userDetails.push(userValue);
    //     return true;
    //   }
    //   return false;

    return this.httpClient.post("http://localhost:8082/api/user/register", userValue);
  }

  updateMember(id: string | undefined | null, userDetail: UserDetail){
    return this.httpClient.put(`http://localhost:8082/api/user/update/${id}`, userDetail);
  }
  
  signIn(value: Login) {
    return this.httpClient.post('http://localhost:8082/api/user/login', value);
    // if(this.getCurrentUser(value).length !== 0){
    //   localStorage.setItem('username', value.username);
    //   localStorage.setItem('password', value.password);
    //   this.changeAuthenticateStatus(true);
    //   return true;
    // }
    // return false;
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.changeAuthenticateStatus(false);
  }

  // getCurrentUser(login: Login): UserDetail {

  //   // currentUser = this.userDetails.filter(user => 
  //   //   user.email === userValue.username && user.password === userValue.password);
  //   return currentUser;
  // }

  // existingUserCheck(userValue: MemberDetailI): MemberDetailI[] {
  //   let currentUser = [];
  //   currentUser = this.userDetails.filter(user => 
  //     user.email === userValue.email || user.panNumber === userValue.panNumber);
  //   return currentUser;
  // }
}
