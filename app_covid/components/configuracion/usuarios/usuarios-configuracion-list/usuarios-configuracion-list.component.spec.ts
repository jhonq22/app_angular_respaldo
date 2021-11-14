import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosConfiguracionListComponent } from './usuarios-configuracion-list.component';

describe('UsuariosConfiguracionListComponent', () => {
  let component: UsuariosConfiguracionListComponent;
  let fixture: ComponentFixture<UsuariosConfiguracionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosConfiguracionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosConfiguracionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
