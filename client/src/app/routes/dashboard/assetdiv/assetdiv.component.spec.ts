import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetdivComponent } from './assetdiv.component';

describe('AssetdivComponent', () => {
  let component: AssetdivComponent;
  let fixture: ComponentFixture<AssetdivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetdivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetdivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
