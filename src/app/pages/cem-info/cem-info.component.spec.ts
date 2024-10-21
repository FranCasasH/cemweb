import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CemInfoComponent } from './cem-info.component';

describe('CemInfoComponent', () => {
  let component: CemInfoComponent;
  let fixture: ComponentFixture<CemInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CemInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
