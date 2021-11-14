import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoFormAdminComponent } from './equipo-form-admin.component';

describe('EquipoFormAdminComponent', () => {
  let component: EquipoFormAdminComponent;
  let fixture: ComponentFixture<EquipoFormAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoFormAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
