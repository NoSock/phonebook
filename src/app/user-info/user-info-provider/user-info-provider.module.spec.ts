import { UserInfoProviderModule } from './user-info-provider.module';

describe('UserInfoProviderModule', () => {
  let userInfoProviderModule: UserInfoProviderModule;

  beforeEach(() => {
    userInfoProviderModule = new UserInfoProviderModule();
  });

  it('should create an instance', () => {
    expect(userInfoProviderModule).toBeTruthy();
  });
});
