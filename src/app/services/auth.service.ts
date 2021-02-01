import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged = new Subject();
  onHttpLogin = new Subject();

  constructor(private http: HttpClient) {}




  httpLogin(logins: any): any {
    const url = 'http://localhost:8000/auth/login';
    this.http.post(url, logins).subscribe(
      (response: any) => {
        this.onHttpLogin.next(response);
      },
      (error) => {
        console.log('error response', error);
      }
    );
  }
}
