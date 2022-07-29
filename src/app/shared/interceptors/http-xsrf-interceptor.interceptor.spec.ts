import { TestBed } from '@angular/core/testing';

import { HttpXsrfInterceptorInterceptor } from './http-xsrf-interceptor.interceptor';

describe('HttpXsrfInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpXsrfInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpXsrfInterceptorInterceptor = TestBed.inject(HttpXsrfInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
