import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GlobalService } from '../services/global.service';
import { Login, Logout } from '../store/auth.action';
import { AuthState } from '../store/auth.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLogged: boolean;
  staffName: string;
  logins: {
    username: string;
    password: string;
  };
  constructor(
    private globalService: GlobalService,
    private route: Router,
    private store: Store
  ) {
    this.staffName = null;
    this.isLogged = false;
    this.logins = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.globalService.isLogged.subscribe((logged: boolean) => {
      this.isLogged = logged;
      this.staffName = this.store.selectSnapshot(AuthState.fullName);;
    });
  }

  onLogin(): void {
    this.globalService.login(this.logins);
    this.route.navigate(['/tickets']);
  }

}
