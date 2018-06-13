import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactEditorComponent } from './contact-editor.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ContactEditorComponent
  ],
  exports: [
    ContactEditorComponent
  ]
})
export class ContactEditorModule { }
