import { AppPage } from './app.po';
import {browser, element} from 'protractor';
import {fakeAsync} from '@angular/core/testing';

describe('App', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
    await page.navigateTo();
  });

  it('should change languages', async () => {
    expect(page.sizeText).toMatch(/Your phonebook contains \d* contact[s]/);
    page.switchLang();
    expect(page.sizeText).toMatch(/В вашей телефонной книге \d* контакт\w*/);
  });

  it ('should navigate between components, create and delete contacts', async () => {
    browser.sleep(2000);
    const initialSize = await page.getContactsNumber();

    await page.addButton.click();
    expect(page.getPath()).toBe('add');
    browser.sleep(1000);

    page.sendInput('name', 'testName');
    await page.saveButton.click();


    expect(page.getPath()).toBe('contacts');
    browser.sleep(1000);

    expect(page.getContactsNumber()).toBe(initialSize + 1);

    await page.getLastEditLink('testName').click();
    expect(page.getPath()).toMatch(/edit.*/);
    browser.sleep(1000);

    expect(page.getInputValue('name')).toBe('testName');
    page.sendInput('secondName', 'testSecondName');

    await page.saveButton.click();
    browser.sleep(1000);

    expect(page.getPath()).toBe('contacts');
    browser.sleep(1000);

    expect(page.getLastEditLink('Name').getText()).toBe('testName testSecondName');

    await page.getLastEditLink('Name').click();
    expect(page.getPath()).toMatch(/edit.*/);
    browser.sleep(2000);

    expect(page.getInputValue('name')).toBe('testName');
    expect(page.getInputValue('secondName')).toBe('testSecondName');

    await page.deleteButton.click();
    expect(page.getPath()).toBe('contacts');
    browser.sleep(3000);

    expect(page.getContactsNumber()).toBe(initialSize);
  });
});
