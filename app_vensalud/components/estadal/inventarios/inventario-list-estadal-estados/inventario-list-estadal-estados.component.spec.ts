import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioListEstadalEstadosComponent } from './inventario-list-estadal-estados.component';

describe('InventarioListEstadalEstadosComponent', () => {
  let component: InventarioListEstadalEstadosComponent;
  let fixture: ComponentFixture<InventarioListEstadalEstadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioListEstadalEstadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioListEstadalEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
