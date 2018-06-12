import { Component, OnInit } from '@angular/core';

import {Contact} from '../contacts-model';
import {ContactsService} from '../contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  constructor(private contactsService: ContactsService) { }

  getContacts() {
    this.contactsService.getContacts()
      .subscribe(
      response => this.contacts = response
      );
  }

  ngOnInit() {
    this.getContacts();
  }

}
