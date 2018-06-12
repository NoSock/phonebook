import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactsService} from '../contacts.service';
import {Location} from '@angular/common';
import {Contact} from '../contacts-model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactId: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('id');
  }

}
