import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAdminListComponent } from './usuarios-admin-list.component';

describe('UsuariosAdminListComponent', () => {
  let component: UsuariosAdminListComponent;
  let fixture: ComponentFixture<UsuariosAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
