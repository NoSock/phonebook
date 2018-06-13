import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ContactListComponent } from './contact-list.component';
import { PluralJsonModule } from '../../plural-json/plural-json.module';

@NgModule({
  imports: [
    PluralJsonModule,
    TranslateModule,
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ContactListComponent
  ],
  exports: [
    ContactListComponent
  ]
})
export class ContactListModule { }
