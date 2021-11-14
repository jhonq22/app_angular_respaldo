import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEspecialesAdminFormComponent } from './grupo-especiales-admin-form.component';

describe('GrupoEspecialesAdminFormComponent', () => {
  let component: GrupoEspecialesAdminFormComponent;
  let fixture: ComponentFixture<GrupoEspecialesAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoEspecialesAdminFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoEspecialesAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
