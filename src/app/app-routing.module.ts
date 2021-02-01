import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';
import { AddComponent } from './pages/tickets/add/add.component';
import { ListComponent } from './pages/tickets/list/list.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { UpdateComponent } from './pages/tickets/update/update.component';
import { ViewComponent } from './pages/tickets/view/view.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'tickets',
        component: TicketsComponent,
        children: [
          { path: '', component: ListComponent },
          { path: ':id/view', component: ViewComponent },
          { path: ':id/update', component: UpdateComponent },
          { path: 'create', component: AddComponent },
          { path: '**', redirectTo: 'not-found' },
        ],
      },
      { path: '**', redirectTo: 'not-found' },
    ],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
