import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserInfoService} from '../user-info/user-info-provider/user-info.service';
import {FormControl, FormGroup} from '@angular/forms';
import {pipe, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {UserInfoModule} from '../user-info/user-info.module';
import {UserInfo} from '../user-info/user-info-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy{
  langs = [
    {code: 'en', display: 'English'},
    {code: 'ru', display: 'Russian'}
  ];
  form: FormGroup;
  sub: Subscription;

  constructor(private translate: TranslateService,
              private userinfo: UserInfoService) {
    this.translate.setDefaultLang('en');
    this.translate.addLangs(this.langs.map(x => x.code));
    this.form = new FormGroup({
      name: new FormControl(),
      email: new FormControl()
    });
    this.sub = this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.userinfo.setParams(value, true);
    });
  }

  change({target}) {
    this.translate.use(target.value);
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(localStorage.getItem('name')),
      email: new FormControl(localStorage.getItem('email'))
    });
    this.sub = this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.userinfo.setParams(value, true);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
