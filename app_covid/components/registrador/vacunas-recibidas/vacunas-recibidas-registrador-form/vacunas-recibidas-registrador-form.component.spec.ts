import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasRecibidasRegistradorFormComponent } from './vacunas-recibidas-registrador-form.component';

describe('VacunasRecibidasRegistradorFormComponent', () => {
  let component: VacunasRecibidasRegistradorFormComponent;
  let fixture: ComponentFixture<VacunasRecibidasRegistradorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasRecibidasRegistradorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasRecibidasRegistradorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
