import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoListAdminComponent } from './equipo-list-admin.component';

describe('EquipoListAdminComponent', () => {
  let component: EquipoListAdminComponent;
  let fixture: ComponentFixture<EquipoListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
