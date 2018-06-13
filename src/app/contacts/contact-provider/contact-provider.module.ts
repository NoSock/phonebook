import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {ContactsService} from './contacts.service';
import {environment} from '../../../environments/environment';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(
      environment.firebase, 'Phonebook'
    ),
    AngularFireDatabaseModule,
  ],
  providers: [
    ContactsService
  ]
})
export class ContactProviderModule { }
