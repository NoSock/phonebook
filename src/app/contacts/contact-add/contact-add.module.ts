import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ContactAddComponent } from './contact-add.component';
import { ContactEditorModule } from '../contact-editor/contact-editor.module';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    ContactEditorModule,
  ],
  declarations: [
    ContactAddComponent,
  ],
  exports: [
    ContactAddComponent,
  ]
})
export class ContactAddModule { }
