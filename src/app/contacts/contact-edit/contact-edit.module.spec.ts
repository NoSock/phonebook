import { ContactEditModule } from './contact-edit.module';

describe('ContactEditModule', () => {
  let contactEditModule: ContactEditModule;

  beforeEach(() => {
    contactEditModule = new ContactEditModule();
  });

  it('should create an instance', () => {
    expect(contactEditModule).toBeTruthy();
  });
});
