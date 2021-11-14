import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPasswordGeneralFormComponent } from './actualizar-password-general-form.component';

describe('ActualizarPasswordGeneralFormComponent', () => {
  let component: ActualizarPasswordGeneralFormComponent;
  let fixture: ComponentFixture<ActualizarPasswordGeneralFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarPasswordGeneralFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPasswordGeneralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
