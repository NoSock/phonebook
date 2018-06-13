import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  langs = [
    {code: 'en', display: 'English'},
    {code: 'ru', display: 'Russian'}
  ];

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.addLangs(this.langs.map(x => x.code));
  }

  change({target}) {
    this.translate.use(target.value);
  }

}
