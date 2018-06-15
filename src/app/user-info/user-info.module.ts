import { NgModule } from '@angular/core';
import {UserInfoProviderModule} from './user-info-provider/user-info-provider.module';
import {UserInfoService} from './user-info-provider/user-info.service';

@NgModule({
  imports: [
    UserInfoProviderModule
  ],
  providers: [
    UserInfoService
  ]
})
export class UserInfoModule { }
