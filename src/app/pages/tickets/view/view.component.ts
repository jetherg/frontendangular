import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  isLogged: any;
  ticket: any;
  constructor(
    private globalService: GlobalService,
    private ticketService: TicketService,
    private router: ActivatedRoute,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.globalService.isLogged.subscribe((logged: any) => {
      this.isLogged = logged;
    });
    this.globalService.checkLogStatus();
    if (!this.isLogged) {
      this.route.navigate(['/']);
    }
    this.router.params.subscribe((params: Params) => {
      this.ticketService.httpGetTicket(params.id).subscribe((ticket: any) => {
        this.ticket = ticket;
      });
    });
  }


  onDelete(ticket: any): void {
    if (confirm('are you sure you want to delete this ticket?\n#'+ticket.id+'-'+ticket.name)) {
      this.ticketService.httpDeleteTicket(ticket.id).subscribe(
        (response: any) => {
          alert('ticket has been deleted!\n#'+ticket.id+'-'+ticket.name);
          this.route.navigate(['/tickets']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
