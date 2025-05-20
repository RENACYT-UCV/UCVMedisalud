import { TestBed } from '@angular/core/testing';

import { NotificationsEDTService } from './services/notifications_EDT.service';

describe('NotificationsService', () => {
  let service: NotificationsEDTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsEDTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
