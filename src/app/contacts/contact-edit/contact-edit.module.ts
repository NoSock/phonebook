import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactEditComponent } from './contact-edit.component';
import { ContactEditorModule } from '../contact-editor/contact-editor.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    ContactEditorModule
  ],
  declarations: [
    ContactEditComponent
  ],
  exports: [
    ContactEditComponent
  ]
})
export class ContactEditModule { }
