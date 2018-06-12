import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

import { Contact } from '../contacts-model';


@Injectable()
export class ContactsService {
  dbContacts: AngularFireList<Contact>;
  constructor(private fireDatabase: AngularFireDatabase) {
    this.dbContacts = this.fireDatabase.list('/contact-list');
  }

  getContacts(): Observable<Contact[]> {
    return this.dbContacts.valueChanges().pipe(
      tap(console.log),
    );
  }

  getContact(id: string): Observable<Contact> {
    return this.dbContacts.valueChanges().pipe(
      map(
        array => array.find(
          contact => contact.id === id
        )
      ),
      filter(v => !!v )
    );
  }

  saveContact(c: Contact): void {
    if (!c.id) {
      const id = this.dbContacts.push(c);
      c.id = id.key;
    }
    this.dbContacts.update(c.id, c);
  }

  deleteContact(id: string) {
    this.dbContacts.remove(id);
  }
}
