import { Injectable } from '@angular/core';
import { Auth, getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  public apiBase: string = environment.apiUserUrl;
  public addApi: string = "/v1"

  constructor(private http: HttpClient) {
  }

/**
 * Check if the user already exist in the database
 * 
 * @param
 * @returns
 */
  public existUser(email : any):  Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBase + this.addApi + "/" + email, {headers: this.httpHeaders}).subscribe({
        next: (response) => { 
          resolve(response); 
        },
        error: (err) => {
          reject(err); 
        }  
      });
    });
  }

  /**
   * Create a new user in the database
   * @param email 
   * @returns 
   */
  public createUser(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let formData: FormData = new FormData();
      formData.append('email', email);
      this.http.post(this.apiBase + this.addApi, formData).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }
}
