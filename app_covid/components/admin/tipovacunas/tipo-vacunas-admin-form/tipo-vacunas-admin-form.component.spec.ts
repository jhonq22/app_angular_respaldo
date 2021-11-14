import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVacunasAdminFormComponent } from './tipo-vacunas-admin-form.component';

describe('TipoVacunasAdminFormComponent', () => {
  let component: TipoVacunasAdminFormComponent;
  let fixture: ComponentFixture<TipoVacunasAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoVacunasAdminFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVacunasAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
