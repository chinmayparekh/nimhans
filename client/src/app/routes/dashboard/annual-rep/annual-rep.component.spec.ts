import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualRepComponent } from './annual-rep.component';

describe('AnnualRepComponent', () => {
  let component: AnnualRepComponent;
  let fixture: ComponentFixture<AnnualRepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualRepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
