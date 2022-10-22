import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointementPageComponent } from './appointement-page.component';

describe('AppointementPageComponent', () => {
  let component: AppointementPageComponent;
  let fixture: ComponentFixture<AppointementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
