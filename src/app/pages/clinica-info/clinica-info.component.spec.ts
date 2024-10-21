import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaInfoComponent } from './clinica-info.component';

describe('ClinicaInfoComponent', () => {
  let component: ClinicaInfoComponent;
  let fixture: ComponentFixture<ClinicaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicaInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
