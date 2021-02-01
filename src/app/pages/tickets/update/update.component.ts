import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { TicketService } from 'src/app/services/ticket.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  isLogged: any;
  ticketForm: any;
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
    this.ticketForm = new FormGroup({
      id:new FormControl('',[Validators.required]),
      name:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
    });
    this.router.params.subscribe((params: Params) => {
      this.ticketService.httpGetTicket(params.id).subscribe((ticket: any) => {
        this.fillForm(ticket);
        this.ticket = ticket;
      });
    });
  }

  fillForm(data:any):void{
    this.ticketForm.patchValue({
      id: data.id,
      name: data.name,
      description: data.description,
    });
  }

  onSubmit():void {
    console.log('valid form',this.ticketForm.valid);
    console.log('profile form',this.ticketForm.value);

    if (this.ticketForm.valid){

      const formValues = this.ticketForm.value;
      this.ticketService.httpUpdateTicket(formValues).subscribe(
        (response:any) => {
          alert('ticket has been updated!\n#'+formValues.id+'-'+formValues.name);
          this.route.navigate(['/tickets/'+formValues.id+'/view']);
        },
        (error:any) => {
          console.log(error);
        });
    } else {
      alert('Invalid Form!')
    }

  }

  onDelete(): void {
    const ticket = this.ticket;
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
