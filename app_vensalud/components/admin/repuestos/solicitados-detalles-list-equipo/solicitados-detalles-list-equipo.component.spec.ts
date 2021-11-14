import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitadosDetallesListEquipoComponent } from './solicitados-detalles-list-equipo.component';

describe('SolicitadosDetallesListEquipoComponent', () => {
  let component: SolicitadosDetallesListEquipoComponent;
  let fixture: ComponentFixture<SolicitadosDetallesListEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitadosDetallesListEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitadosDetallesListEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
