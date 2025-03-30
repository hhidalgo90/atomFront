import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
    public apiBase: string = environment.apiTaskUrl;
    public addApi: string = "/v1"

  constructor(private http: HttpClient) { }

  addTask(task: any, email : any) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiBase + this.addApi + "/" + email, task).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  deleteTask(userEmail: string, taskId: any) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.apiBase + this.addApi + "/" + userEmail + "/" + taskId, {headers: this.httpHeaders}).subscribe({
        next: (response) => { 
          resolve(response); 
        },
        error: (err) => {
          reject(err); 
        }  
      });
    });
  }

  getTasks(email : string) : Promise<any> {
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

  updateTask(userEmail: string, taskId: any, task: any) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.apiBase + this.addApi + "/" + userEmail + "/" + taskId, task).subscribe({
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
