import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { ListComponent } from './pages/tickets/list/list.component';
import { ViewComponent } from './pages/tickets/view/view.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AuthState } from './store/auth.state';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './pages/tickets/add/add.component';
import { UpdateComponent } from './pages/tickets/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    NotFoundComponent,
    PagesComponent,
    TicketsComponent,
    ListComponent,
    ViewComponent,
    HomeComponent,
    AddComponent,
    UpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState],{
      developmentMode:!environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
