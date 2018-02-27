import { AppPage } from './app.po';

describe('high-like App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getNavbarTitle()).toEqual('High Like');
  });

  it('should display 1 person when city is holon', () => {
    page.navigateTo();
    page.updateCityInput('חולון').then(data1 => {
      page.submit().then(data2 => {
        page.getRowCount().then(data3 => {
          expect(data3).toBe(2);
        });
      });
    });
  });

  it('should display 3 persons when city is tel-aviv', () => {
    page.navigateTo();
    page.updateCityInput('חולון').then(data1 => {
      page.submit().then(data2 => {
        page.clearCityInput().then(data3 => {
          page.updateCityInput('תל אביב').then(data4 => {
            page.submit().then(data5 => {
              page.getRowCount().then(data6 => {
                expect(data6).toBe(8);
              });
            });
          });
        });
      });
    });
  });
});
