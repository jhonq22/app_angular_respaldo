import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesRepuestosPedidosComponent } from './detalles-repuestos-pedidos.component';

describe('DetallesRepuestosPedidosComponent', () => {
  let component: DetallesRepuestosPedidosComponent;
  let fixture: ComponentFixture<DetallesRepuestosPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesRepuestosPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesRepuestosPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
