import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {Contact} from '../contacts-model';
import {ContactsService} from '../contact-provider/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Observable<Contact[]>;
  sub: Subscription;
  size = 0;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
    this.sub = this.contacts.subscribe(
      contacts => this.size = contacts.length
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
