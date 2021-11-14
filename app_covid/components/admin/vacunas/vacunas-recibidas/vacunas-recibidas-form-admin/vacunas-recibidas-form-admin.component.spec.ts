import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasRecibidasFormAdminComponent } from './vacunas-recibidas-form-admin.component';

describe('VacunasRecibidasFormAdminComponent', () => {
  let component: VacunasRecibidasFormAdminComponent;
  let fixture: ComponentFixture<VacunasRecibidasFormAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasRecibidasFormAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasRecibidasFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
