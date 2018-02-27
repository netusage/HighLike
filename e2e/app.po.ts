import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getNavbarTitle() {
    return element(by.css('app-root span')).getText();
  }

  submit() {
    return element(by.css('app-search button')).click();
  }

  clearCityInput() {
    return element(by.css('app-search input')).clear();
  }

  updateCityInput(value: string) {
    return element(by.css('app-search input')).sendKeys(value);
  }

  getRowCount() {
    const rows = element.all(by.css('app-results app-person-card'));
    return rows.count();
  }
}
