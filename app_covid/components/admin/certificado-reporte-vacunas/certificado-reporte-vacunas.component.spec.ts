import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoReporteVacunasComponent } from './certificado-reporte-vacunas.component';

describe('CertificadoReporteVacunasComponent', () => {
  let component: CertificadoReporteVacunasComponent;
  let fixture: ComponentFixture<CertificadoReporteVacunasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoReporteVacunasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoReporteVacunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
