import { TestBed } from '@angular/core/testing';

import { AuthHttpInterceptor } from './auth-http-interceptor.interceptor';

describe('AuthHttpInterceptorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthHttpInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: AuthHttpInterceptor =
      TestBed.inject(AuthHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
