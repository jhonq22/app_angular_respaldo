import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesRepuestosActualizarComponent } from './detalles-repuestos-actualizar.component';

describe('DetallesRepuestosActualizarComponent', () => {
  let component: DetallesRepuestosActualizarComponent;
  let fixture: ComponentFixture<DetallesRepuestosActualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesRepuestosActualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesRepuestosActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
