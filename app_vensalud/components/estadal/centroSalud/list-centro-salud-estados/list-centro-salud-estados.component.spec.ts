import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCentroSaludEstadosComponent } from './list-centro-salud-estados.component';

describe('ListCentroSaludEstadosComponent', () => {
  let component: ListCentroSaludEstadosComponent;
  let fixture: ComponentFixture<ListCentroSaludEstadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCentroSaludEstadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCentroSaludEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
