import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVacunasAdminListComponent } from './tipo-vacunas-admin-list.component';

describe('TipoVacunasAdminListComponent', () => {
  let component: TipoVacunasAdminListComponent;
  let fixture: ComponentFixture<TipoVacunasAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoVacunasAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVacunasAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
