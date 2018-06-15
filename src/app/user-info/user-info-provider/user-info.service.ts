import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';
import {UserInfo} from '../user-info-model';

@Injectable()
export class UserInfoService implements  OnDestroy{
  sub: Subscription;
  userInfo: UserInfo;

  constructor(private route: ActivatedRoute) {
    this.userInfo = new UserInfo();
    this.sub = this.route.queryParams.subscribe(params => {
      this.setParams(params);
      console.log(params);
    });
  }

  info() {
    return {
      ...this.userInfo
    };
  }

  setParam(key: string, value: string, overwrite?: boolean) {
    if (overwrite || !this.userInfo[key]) {
      this.info[key] = value;
      localStorage.setItem(key, value);
    }
  }

  setParams(params: object, overwrite?: boolean) {
    const paramKeys = Object.getOwnPropertyNames(params);
    paramKeys.forEach(key => {
      if (overwrite || !this.userInfo[key]) {
        this.userInfo[key] = params[key];
        localStorage.setItem(key, this.userInfo[key]);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
