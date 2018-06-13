import { PluralJsonModule } from './plural-json.module';

describe('PluralJsonModule', () => {
  let pluralJsonModule: PluralJsonModule;

  beforeEach(() => {
    pluralJsonModule = new PluralJsonModule();
  });

  it('should create an instance', () => {
    expect(pluralJsonModule).toBeTruthy();
  });
});
