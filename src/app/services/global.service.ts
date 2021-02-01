import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth.state';
import { Login, Logout } from '../store/auth.action';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  isLogged = new Subject();
  constructor(
    private http: HttpClient,
    private store: Store,
    private route: Router,
    private authsService: AuthService
  ) {}

  checkLogStatus(): void {
    const token = this.store.selectSnapshot(AuthState.token);
    if (token) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }

  login(logins: any): void {
    this.store.dispatch(new Login(logins));
    this.authsService.isLogged.subscribe((response: any) => {
      if (response) {
        this.isLogged.next(true);
        this.route.navigate(['/tickets']);
      }
    });

  }

  logout(): void {
    this.store.dispatch(new Logout());
    this.authsService.isLogged.subscribe((response: any) => {
      if (!response) {
        this.isLogged.next(false);
        this.route.navigate(['/']);
      }
    });
  }
}
