import { ContactEditorModule } from './contact-editor.module';

describe('ContactEditorModule', () => {
  let contactEditorModule: ContactEditorModule;

  beforeEach(() => {
    contactEditorModule = new ContactEditorModule();
  });

  it('should create an instance', () => {
    expect(contactEditorModule).toBeTruthy();
  });
});
