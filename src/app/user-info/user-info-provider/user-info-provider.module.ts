import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserInfoService} from './user-info.service';

@NgModule({
  imports: [
    RouterModule
  ],
  providers: [UserInfoService],
})
export class UserInfoProviderModule { }
