import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesRepuestoDetallesAdminComponent } from './reportes-repuesto-detalles-admin.component';

describe('ReportesRepuestoDetallesAdminComponent', () => {
  let component: ReportesRepuestoDetallesAdminComponent;
  let fixture: ComponentFixture<ReportesRepuestoDetallesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesRepuestoDetallesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesRepuestoDetallesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
