import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ActivatedRouteSnapshot, ParamMap} from '@angular/router';

import {ContactsService} from '../contact-provider/contacts.service';
import {Contact} from '../contacts-model';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.less']
})
export class ContactEditorComponent implements OnInit, OnDestroy {
  private queryParams: ParamMap;
  private params: ParamMap;
  form: FormGroup;
  contact: Contact;
  phoneNumbers: FormArray;
  subscriptions: Subscription[] = [];
  contactId = '';

  constructor(private formBuilder: FormBuilder,
              private contactsService: ContactsService,
              private location: Location,
              private route: ActivatedRoute) {
    this.params = this.route.snapshot.paramMap;
    this.queryParams = this.route.snapshot.queryParamMap;
  }

  createForm() {
    this.phoneNumbers = this.formBuilder.array(this.getNumberInputs());
    this.form = this.formBuilder.group({
      name: [this.contact.name, Validators.required],
      secondName: this.contact.secondName,
      age: this.contact.age,
    });
  }

  getNumberInputs():  FormControl[] {
    return !this.contact.phoneNumbers.length ? [] :
      this.contact.phoneNumbers
        .map(number => new FormControl(number, Validators.required));
  }

  addNumber() {
    this.phoneNumbers.push(
      new FormControl('', Validators.required)
    );
  }

  hideNumber(i: number) {
    this.phoneNumbers.removeAt(i);
  }

  save() {
    Object.assign(this.contact, this.form.value);
    this.contact.phoneNumbers = this.phoneNumbers.value;
    if (this.contactId) {
      this.contact.id = this.contactId;
    }
    if (!this.contact.phoneNumbers) {
      this.contact.phoneNumbers = [];
    }
    this.contactsService.saveContact(this.contact);
    this.back();
  }

  delete() {
    this.contactsService.deleteContact(this.contactId);
    this.back();
  }

  back() {
    this.location.back();
  }

  loadContact() {
    this.subscriptions.push(
      this.contactsService.getContact(this.contactId)
        .subscribe(contact => {
          this.contact = contact;
          if (!contact.phoneNumbers) {
            contact.phoneNumbers = [];
          }
          this.createForm();
        })
    );
  }

  initContact() {
    this.contact = new Contact();
    this.contact.name = this.queryParams.get('name') || '';
    this.contact.secondName = this.queryParams.get('secondName') || '';
    this.contact.age = +this.queryParams.get('age') || undefined;
    const number = this.queryParams.get('phoneNumber');
    if (number) {
      this.contact.phoneNumbers.push(number);
    }
    if (this.contactId) {
      this.loadContact();
    }
  }

  ngOnInit() {
    this.contactId = this.params.get('id');
    this.initContact();
    this.createForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
