import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryAndStateService {

  countries: any = [
    {country_name: 'Afghanistan', states: ['Badgis', 'Balkh', 'Farah', 'Gazni', 'Herat']},
    {country_name: 'Albania', states: ['Berat', 'Delvine', 'Devoll', 'Fier', 'Has']},
    {country_name: 'India', states: ['Assam', 'Bihar', 'Delhi', 'Kerala', 'Tamil Nadu']},
    {country_name: 'Japan', states: ['Aichi', 'Chiba', 'Gifu', 'Iwate', 'Kagawa']},
    {country_name: 'Kenya', states: ['Central', 'Coast', 'Eastern', 'Nairobo', 'Western']}
  ]

  baseUrl = 'https://www.universal-tutorial.com/api';

  websiteToken: string = 'MfFCoa_ahZIRif5pfQuGmV7b_S4BSnoiGKykEABU4SbZiYYIDdiI5UhUr5MfBvpu_I0'; 

  apiToken: string = '';

  // countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  constructor(private http: HttpClient) {
   }

  getToken(){
    const header = new HttpHeaders()
    .set('Content-Type',  'application/json')
    .set('api-token', this.websiteToken)
    .set('user-email', 'haritharaj181167@gmail.com')

    this.http.get(`${this.baseUrl}/getaccesstoken`, 
      {headers: header}).subscribe((response: any)=>{
        debugger;
        this.apiToken = response.auth_token;
        this.getCountry();
    });
  }

  getCountry(){
    const header = new HttpHeaders()
    .set('Content-Type',  'application/json')
    .set('Authorization', `Bearer ${this.apiToken}`)

    this.http.get(`${this.baseUrl}/countries`, 
      {headers: header}).subscribe((response: any)=>{
        this.countries = response;
        this.getStates('Afghanistan').subscribe((response) =>{
          this.states = response;
        });
    });
  }

  getStates(countryName: string): Observable<any>{
    const header = new HttpHeaders()
    .set('Content-Type',  'application/json')
    .set('Authorization', `Bearer ${this.apiToken}`)

    return this.http.get(`${this.baseUrl}/states/${countryName}`, 
      {headers: header});
  }

  getCities(stateName: string){
    const header = new HttpHeaders()
    .set('Content-Type',  'application/json')
    .set('Authorization', `Bearer ${this.apiToken}`)

    return this.http.get(`${this.baseUrl}/cities/${stateName}`, 
      {headers: header});
  }
}
