import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactsComponent} from './contacts/contacts.component';
import {AddContactComponent} from './add-contact/add-contact.component';
import {EditContactComponent} from './edit-contact/edit-contact.component';

const routes: Routes = [
  {path: 'edit/:id', component: EditContactComponent},
  {path: 'add', component: AddContactComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: '', redirectTo: 'contacts', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
