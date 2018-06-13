import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from '../routing/app-routing.module';
import { ContactsModule } from '../contacts/contacts.module';

import { AppComponent } from './app.component';
import { UserInfoModule } from '../user-info/user-info.module';

export function
HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,
    './assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    ContactsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    UserInfoModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
