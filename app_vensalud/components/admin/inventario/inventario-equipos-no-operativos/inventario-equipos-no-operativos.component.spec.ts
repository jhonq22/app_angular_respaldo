import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioEquiposNoOperativosComponent } from './inventario-equipos-no-operativos.component';

describe('InventarioEquiposNoOperativosComponent', () => {
  let component: InventarioEquiposNoOperativosComponent;
  let fixture: ComponentFixture<InventarioEquiposNoOperativosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioEquiposNoOperativosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioEquiposNoOperativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
