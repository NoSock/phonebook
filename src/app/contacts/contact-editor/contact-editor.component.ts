import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {ContactsService} from '../contact-provider/contacts.service';
import {Contact} from '../contacts-model';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.less']
})
export class ContactEditorComponent implements OnInit, OnDestroy {
  form: FormGroup;
  contact: Contact;
  phoneNumbers: FormArray;
  subscriptions: Subscription[] = [];

  @Input()
  contactId = '';

  constructor(private formBuilder: FormBuilder,
              private contactsService: ContactsService,
              private location: Location,
              private route: ActivatedRoute) {
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
    console.log("form: ", this.form.value);
    Object.assign(this.contact, this.form.value);
    this.contact.phoneNumbers = this.phoneNumbers.value;
    console.log("contact: ", this.contact)
    if (this.contactId){
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

  initContact() {
    this.contact = new Contact();
    this.subscriptions.push(
      this.contactsService.getContact(this.contactId)
        .subscribe(contact => {
          this.contact = contact;
          if (!contact.phoneNumbers){
            contact.phoneNumbers = [];
          }
          this.createForm();
        })
    );
  }

  ngOnInit() {
    this.initContact();
    this.createForm();
    console.log(this.route.snapshot.paramMap.get('shit'));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
