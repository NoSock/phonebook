import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from '../routing/app-routing.module';
import { ContactEditorModule } from './contact-editor/contact-editor.module';
import { ContactListModule } from './contact-list/contact-list.module';
import { ContactAddModule } from './contact-add/contact-add.module';
import { ContactEditModule } from './contact-edit/contact-edit.module';
import { ContactProviderModule } from './contact-provider/contact-provider.module';

@NgModule({
  imports: [
    RouterModule,
    AppRoutingModule,
    ContactEditorModule,
    ContactListModule,
    ContactAddModule,
    ContactEditModule,
    ContactProviderModule,
  ],
  exports: [
    ContactListModule,
    ContactEditModule,
    ContactAddModule,
  ]
})
export class ContactsModule { }
