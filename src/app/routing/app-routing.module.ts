import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactListComponent} from '../contacts/contact-list/contact-list.component';
import {ContactAddComponent} from '../contacts/contact-add/contact-add.component';
import {ContactEditComponent} from '../contacts/contact-edit/contact-edit.component';

const routes: Routes = [
  {path: 'edit/:id', component: ContactEditComponent},
  {path: 'add', component: ContactAddComponent},
  {path: 'contacts', component: ContactListComponent},
  {path: '', redirectTo: 'contacts', pathMatch: 'full'},
  { path: '**', component: ContactListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
