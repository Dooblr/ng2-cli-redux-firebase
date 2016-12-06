import { KojiSushiPage } from './app.po';

describe('koji-sushi App', function() {
  let page: KojiSushiPage;

  beforeEach(() => {
    page = new KojiSushiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
