import { Injectable } from '@angular/core';
import { Subject, Timestamp } from 'rxjs';
import { AuthState } from '../store/auth.state';
import { Store } from '@ngxs/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class TicketModel {
  id: bigint;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const api_ticket_url = 'http://localhost:8000/api/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  constructor(private http: HttpClient, private store: Store) {}

  httpGetAllTickets(): any {
    const token = this.getToken();
    const header = new HttpHeaders();
    return this.http
    .get(api_ticket_url, {
      headers: new HttpHeaders().append('Authorization', token),
    });
  }
  httpGetTicket(id:number): any {
    const token = this.getToken();
    const header = new HttpHeaders();
    const url = api_ticket_url+'/'+id;
    return this.http
    .get(url, {
      headers: new HttpHeaders().append('Authorization', token),
    });
  }


  httpAddTicket(data:any): any {
    const token = this.getToken();
    const header = new HttpHeaders();
    return this.http
    .post(api_ticket_url,data, {
      headers: new HttpHeaders().append('Authorization', token),
    });
  }

  httpUpdateTicket(data:any): any {
    console.log('update id',data.id);
    console.log('update data',data);
    const token = this.getToken();
    const header = new HttpHeaders();
    const url = api_ticket_url+'/'+data.id;
    return this.http
    .put(url,data, {
      headers: new HttpHeaders().append('Authorization', token),
    });
  }


  httpDeleteTicket(id:number): any {
    const token = this.getToken();
    const header = new HttpHeaders();
    const url = api_ticket_url+'/'+id;
    return this.http
    .delete(url, {
      headers: new HttpHeaders().append('Authorization', token),
    });
  }

  private getToken(): string {
    const token = this.store.selectSnapshot(AuthState.token);
    return token || '';
  }
}
