import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesEstadalInventarioComponent } from './reportes-estadal-inventario.component';

describe('ReportesEstadalInventarioComponent', () => {
  let component: ReportesEstadalInventarioComponent;
  let fixture: ComponentFixture<ReportesEstadalInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesEstadalInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesEstadalInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
