import { ContactProviderModule } from './contact-provider.module';

describe('ContactProviderModule', () => {
  let contactProviderModule: ContactProviderModule;

  beforeEach(() => {
    contactProviderModule = new ContactProviderModule();
  });

  it('should create an instance', () => {
    expect(contactProviderModule).toBeTruthy();
  });
});
