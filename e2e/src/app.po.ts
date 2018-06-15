import {browser, by, element, promise} from 'protractor';

export class AppPage {
  baseUrl = 'http://localhost:4200/';
  isRussian: boolean;

  async navigateTo() {
    const result = browser.get('/');
    this.isRussian = false;
    return result;
  }

  get sizeText() {
    return element(by.className('size')).getText();
  }

  switchLang() {
    element(by.cssContainingText('option',
      this.isRussian ? 'English' : 'Russian')
    ).click();
    this.isRussian = !this.isRussian;
  }

  get formHeaderText() {
    return element(by.tagName('form')).getText();
  }

  get addButton() {
    return element(by.buttonText('Add contact'));
  }

  get deleteButton() {
    return element(by.buttonText('Delete'));
  }

  getLastEditLink(text?: string) {
    return element.all(
      by.cssContainingText('div', text)
    ).last();
  }

  get saveButton() {
    return element(by.buttonText('Save'));
  }

  async getContactsNumber() {
    const text = await this.sizeText;
    const result =  +( text.match(/\d+/) );
    return result;
  }

  getInputField(inputFieldName: string) {
    return element(by.css(`[ng-reflect-name=${inputFieldName}]`));
  }

  sendInput(inputFieldName: string, inputText: string) {
    this.getInputField(inputFieldName)
      .sendKeys(inputText);
  }

  getInputValue(inputFieldName: string) {
    return this.getInputField(inputFieldName)
      .getAttribute('value');
  }

  async getPath(): Promise<string> {
    const url = await browser.getCurrentUrl();
    return url.slice(this.baseUrl.length);
  }
}
