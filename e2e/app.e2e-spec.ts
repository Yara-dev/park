import { ProjetangularPage } from './app.po';

describe('projetangular App', () => {
  let page: ProjetangularPage;

  beforeEach(() => {
    page = new ProjetangularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
