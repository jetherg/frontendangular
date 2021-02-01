import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  constructor(private globalService: GlobalService, private route: Router) {}

  ngOnInit(): void {
    this.globalService.isLogged.subscribe((logged: boolean) => {
      if (!logged) {
        this.route.navigate(['/']);
      }
    });
    this.globalService.checkLogStatus();
  }
}
