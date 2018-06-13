import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralJsonPipe } from './plural-json.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PluralJsonPipe
  ],
  exports: [
    PluralJsonPipe
  ]
})
export class PluralJsonModule { }
