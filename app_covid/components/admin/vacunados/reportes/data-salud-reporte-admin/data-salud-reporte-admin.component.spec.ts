import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSaludReporteAdminComponent } from './data-salud-reporte-admin.component';

describe('DataSaludReporteAdminComponent', () => {
  let component: DataSaludReporteAdminComponent;
  let fixture: ComponentFixture<DataSaludReporteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSaludReporteAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSaludReporteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
