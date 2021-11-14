import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesCentroSaludRegistradorComponent } from './reportes-centro-salud-registrador.component';

describe('ReportesCentroSaludRegistradorComponent', () => {
  let component: ReportesCentroSaludRegistradorComponent;
  let fixture: ComponentFixture<ReportesCentroSaludRegistradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesCentroSaludRegistradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesCentroSaludRegistradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
