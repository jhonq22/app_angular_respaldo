import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosConfiguracionFormComponent } from './usuarios-configuracion-form.component';

describe('UsuariosConfiguracionFormComponent', () => {
  let component: UsuariosConfiguracionFormComponent;
  let fixture: ComponentFixture<UsuariosConfiguracionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosConfiguracionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosConfiguracionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
