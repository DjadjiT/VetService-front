import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointementDetailsComponent } from './appointement-details.component';

describe('AppointementDetailsComponent', () => {
  let component: AppointementDetailsComponent;
  let fixture: ComponentFixture<AppointementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
