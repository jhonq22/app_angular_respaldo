import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAdminFormComponent } from './usuarios-admin-form.component';

describe('UsuariosAdminFormComponent', () => {
  let component: UsuariosAdminFormComponent;
  let fixture: ComponentFixture<UsuariosAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosAdminFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
