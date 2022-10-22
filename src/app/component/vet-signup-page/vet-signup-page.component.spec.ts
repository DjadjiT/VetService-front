import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetSignupPageComponent } from './vet-signup-page.component';

describe('VetSignupPageComponent', () => {
  let component: VetSignupPageComponent;
  let fixture: ComponentFixture<VetSignupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetSignupPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VetSignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
