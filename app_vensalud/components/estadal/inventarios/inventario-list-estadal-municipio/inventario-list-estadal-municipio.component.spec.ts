import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioListEstadalMunicipioComponent } from './inventario-list-estadal-municipio.component';

describe('InventarioListEstadalMunicipioComponent', () => {
  let component: InventarioListEstadalMunicipioComponent;
  let fixture: ComponentFixture<InventarioListEstadalMunicipioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioListEstadalMunicipioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioListEstadalMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
