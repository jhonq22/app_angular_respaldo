import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoRespuestoAdminListComponent } from './equipo-respuesto-admin-list.component';

describe('EquipoRespuestoAdminListComponent', () => {
  let component: EquipoRespuestoAdminListComponent;
  let fixture: ComponentFixture<EquipoRespuestoAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoRespuestoAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoRespuestoAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
