import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarContrasenaEstadalComponent } from './cambiar-contrasena-estadal.component';

describe('CambiarContrasenaEstadalComponent', () => {
  let component: CambiarContrasenaEstadalComponent;
  let fixture: ComponentFixture<CambiarContrasenaEstadalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarContrasenaEstadalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarContrasenaEstadalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
