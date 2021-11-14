import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoRespuestoAdminFormComponent } from './equipo-respuesto-admin-form.component';

describe('EquipoRespuestoAdminFormComponent', () => {
  let component: EquipoRespuestoAdminFormComponent;
  let fixture: ComponentFixture<EquipoRespuestoAdminFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoRespuestoAdminFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoRespuestoAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
