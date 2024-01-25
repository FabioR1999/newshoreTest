import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnNewConsultComponent } from './btn-new-consult.component';

describe('BtnNewConsultComponent', () => {
  let component: BtnNewConsultComponent;
  let fixture: ComponentFixture<BtnNewConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnNewConsultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnNewConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
