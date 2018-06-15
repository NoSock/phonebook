import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ActivatedRoute, ActivatedRouteSnapshot, ParamMap} from '@angular/router';
import {CommonModule, Location } from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of} from 'rxjs';

import { ContactEditorComponent } from './contact-editor.component';
import {Contact} from '../contacts-model';
import {ContactsService} from '../contact-provider/contacts.service';
import {HttpLoaderFactory} from '../../app/app.module';

let mockQueryContact: Contact;
let mockDbContact: Contact;

let savedContact: Contact;
let deletedContactId: string;
class MockContactsService {
  getContacts(): Observable<Contact[]> {
    mockDbContact.id = undefined;
    return of([mockDbContact]);
  }

  getContact(id: string): Observable<Contact> {
    mockDbContact.id = 'mockId';
    return of(mockDbContact);
  }

  saveContact(contact: Contact) {
    savedContact = contact;
  }

  deleteContact(id: string) {
    deletedContactId = id;
  }
}

class MockQueryParamMap implements ParamMap {
  readonly keys: string[];

  get(name: string): string | null {
    if (name === 'phoneNumber') {
      return mockQueryContact.phoneNumbers[0];
    } else if (name === 'id') {
      return 'mockId';
    } else {
      return mockQueryContact[name];
    }
  }

  getAll(name: string): string[] {
    return undefined;
  }

  has(name: string): boolean {
    return false;
  }
}


class MockActivatedRoute extends  ActivatedRoute {
  constructor() {
    super();
    this.snapshot = {
      ...(new ActivatedRouteSnapshot()),
      queryParamMap: new MockQueryParamMap(),
      paramMap: new MockQueryParamMap(),
    };
  }
}

class MockLocation extends Location {
  back() {}
}

describe('ContactEditorComponent', () => {
  let fixture: ComponentFixture<ContactEditorComponent>;
  let component: ContactEditorComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [ ContactEditorComponent ],
      providers: [
        {provide: ContactsService, useClass: MockContactsService},
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
      ]
    })
    .compileComponents();

  }));

  beforeEach(fakeAsync(() => {
    mockQueryContact = new Contact();
    mockDbContact = new Contact();
    Object.assign(mockQueryContact, {
      name: 'queryMockName',
      secondName: 'queryMockSecondName',
      age: 999,
      phoneNumbers: ['queryMockPhone']
    });
    Object.assign(mockDbContact, {
      name: 'mockName',
      secondName: 'mockSecondName',
      age: 666,
      phoneNumbers: ['mockPhone1', 'mockPhone2']
    });
    fixture = TestBed.createComponent(ContactEditorComponent);
    tick();
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the contact with the right info', () => {
    component.contactId = undefined;
    component.initContact();
    fixture.detectChanges();
    expect(component.contact).toEqual(mockQueryContact);
  });

  it('should load the contact info from the service', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.contact).toEqual(mockDbContact);
  }));

  it('should load the contact from db', fakeAsync( () => {
    component.loadContact();
    tick();
    fixture.detectChanges();
    expect(component.contact).toEqual(mockDbContact);
  }));

  it('should create the right form', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    const nativeElement = fixture.debugElement.nativeElement;
    expect(nativeElement.querySelector('[formControlName=name]').value).toEqual(mockDbContact.name);
    expect(nativeElement.querySelector('[formControlName=secondName]').value).toEqual(mockDbContact.secondName);
    expect(nativeElement.querySelector('[formControlName=age]').value).toEqual(mockDbContact.age + '');
  }));

  it('should create a number inputs array', () => {
    const fakeControls = mockDbContact.phoneNumbers.map(number =>
      new FormControl(number, Validators.required)
    );
    const realControls = component.getNumberInputs();
    expect(realControls.length).toEqual(fakeControls.length);
    realControls.forEach((control, i) => {
      expect(control.value).toEqual(fakeControls[i].value);
    });
  });

  it('should increase the number of inputs array', () => {
    const numbers = component.phoneNumbers;
    const before = numbers.length;
    component.addNumber();
    expect(numbers.length).toEqual(before + 1);
  });

  it('should decrease the number of inputs array', () => {
    const numbers = component.phoneNumbers;
    const before = numbers.length;
    component.hideNumber(0);
    expect(numbers.length).toEqual(before - 1);
  });

  it('should save  the contact', () => {
    component.save();
    delete savedContact.id;
    expect(savedContact).toEqual(mockDbContact);
  });

  it('should delete  the contact', () => {
    component.save();
    component.delete();
    expect(savedContact.id).toEqual(deletedContactId);
  });

  it('should unsubscribe from everything', () => {
    component.subscriptions.push(
      new Observable().subscribe()
    );
    component.ngOnDestroy();
    for (const s of component.subscriptions) {
      expect(s.closed).toBe(true);
    }
  });
});
