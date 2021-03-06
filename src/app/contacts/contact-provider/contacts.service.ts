import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, tap} from 'rxjs/operators';

import { Contact } from '../contacts-model';


@Injectable()
export class ContactsService {
  dbContacts: Observable<Contact[]>;
  dbList: AngularFireList<Contact>;

  constructor(private fireDatabase: AngularFireDatabase) {
    this.dbList = this.fireDatabase
      .list('/contact-list');
    this.dbContacts = this.dbList.valueChanges().pipe(
        debounceTime(300),
        distinctUntilChanged()
      );
  }

  getContacts(): Observable<Contact[]> {
    return this.dbContacts;
  }

  getContact(id: string): Observable<Contact> {
    return this.dbContacts.pipe(
      map(contacts => contacts.find(
        contact => contact.id === id
      )),
      filter(x => !!x)
    );
  }

  saveContact(contact: Contact) {
    if (!contact.id) {
      const id = this.dbList.push(contact);
      contact.id = id.key;
    }
    this.dbList.set(contact.id, contact);
  }

  deleteContact(id: string) {
    this.dbList.remove(id);
  }

}
