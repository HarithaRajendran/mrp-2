import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalRegistrationComponent } from './portal-registration.component';

describe('PortalRegistrationComponent', () => {
  let component: PortalRegistrationComponent;
  let fixture: ComponentFixture<PortalRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
