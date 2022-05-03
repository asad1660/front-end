import { TestBed } from '@angular/core/testing';

import { ProfilePageService } from './profile-page.service';

describe('ProfilePageServiceService', () => {
  let service: ProfilePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
