import { ContactAddModule } from './contact-add.module';

describe('ContactAddModule', () => {
  let contactAddModule: ContactAddModule;

  beforeEach(() => {
    contactAddModule = new ContactAddModule();
  });

  it('should create an instance', () => {
    expect(contactAddModule).toBeTruthy();
  });
});
