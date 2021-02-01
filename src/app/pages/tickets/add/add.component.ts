import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  ticketForm: any;

  ticket: Ticket ;
  constructor(private ticketService:TicketService,private route:Router) { }

  ngOnInit(): void {
    this.ticketForm = new FormGroup({
      name:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
    });
  }

  fillForm(data:any):void{
    this.ticketForm.patchValue({
      name: data.name,
      description: data.description,
    });
  }

  onSubmit():void {
    console.log('valid form',this.ticketForm.valid);
    console.log('profile form',this.ticketForm.value);

    if (this.ticketForm.valid){

      const formValues = this.ticketForm.value;
      this.ticketService.httpAddTicket(formValues).subscribe(
        (response:any) => {
          alert('New ticket has been added \n'+formValues.name);
          this.route.navigate(['/tickets']);
        },
        (error:any) => {
          console.log(error);
        });
    } else {
      alert('Invalid Form!')
    }

  }

}
