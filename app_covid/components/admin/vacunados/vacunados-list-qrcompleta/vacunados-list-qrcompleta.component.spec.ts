import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunadosListQRCompletaComponent } from './vacunados-list-qrcompleta.component';

describe('VacunadosListQRCompletaComponent', () => {
  let component: VacunadosListQRCompletaComponent;
  let fixture: ComponentFixture<VacunadosListQRCompletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunadosListQRCompletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunadosListQRCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
