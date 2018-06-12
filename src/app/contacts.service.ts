import { Injectable } from '@angular/core';
import {Contact} from './contacts-model';
import {Observable} from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {filter, map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  dbContacts: AngularFireList<Contact>;
  constructor(private fireDatabase: AngularFireDatabase) {
    this.dbContacts = this.fireDatabase.list('/contacts');
  }

  getContacts(): Observable<Contact[]> {
    return this.dbContacts.valueChanges().pipe(
      tap(console.log)
    );
  }

  getContact(id: string): Observable<Contact> {
    return this.dbContacts.valueChanges().pipe(
      map(array => array.reduce((acc, value) => {
          if (value.id === id) {
            return value;
          }
        }, null)
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
