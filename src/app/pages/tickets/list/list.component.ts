import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  ticketList: any;
  name = '';
  constructor(private ticketService: TicketService, private route: Router) {}

  ngOnInit(): void {
    this.GetAllTickets();
  }

  GetAllTickets(): void {
    this.ticketService.httpGetAllTickets().subscribe(
      (response: any) => {
        this.ticketList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onDelete(ticket: any): void {
    if (confirm('are you sure you want to delete this ticket?\n#'+ticket.id+'-'+ticket.name)) {
      this.ticketService.httpDeleteTicket(ticket.id).subscribe(
        (response: any) => {
          alert('ticket has been deleted!\n#'+ticket.id+'-'+ticket.name);
          this.GetAllTickets();
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
