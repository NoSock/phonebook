import { Component, OnInit } from '@angular/core';

import {Contact} from '../contacts-model';
import {ContactsService} from '../contact-provider/contacts.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less']
})
export class ContactListComponent implements OnInit {
  contacts: Observable<Contact[]>;
  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }

}
