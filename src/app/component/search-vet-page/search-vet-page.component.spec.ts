import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVetPageComponent } from './search-vet-page.component';

describe('SearchVetPageComponent', () => {
  let component: SearchVetPageComponent;
  let fixture: ComponentFixture<SearchVetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchVetPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
