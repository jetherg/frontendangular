import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GlobalService } from '../services/global.service';
import { Logout } from '../store/auth.action';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isLogged: boolean;

  constructor(
    private globalService: GlobalService,
    private route: Router,
    private store: Store
  ) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.globalService.isLogged.subscribe((logged: boolean) => {
      this.isLogged = logged;
    });

    this.globalService.checkLogStatus();
  }

  onLogout(): void {
    this.store.dispatch(new Logout());
    this.route.navigate(['/tickets']);
  }
}
