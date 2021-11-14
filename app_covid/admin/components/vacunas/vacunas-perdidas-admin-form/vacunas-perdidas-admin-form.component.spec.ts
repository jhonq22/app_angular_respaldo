import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasPerdidasAdminFormComponent } from './vacunas-perdidas-admin-form.component';

describe('VacunasPerdidasAdminFormComponent', () => {
  let component: VacunasPerdidasAdminFormComponent;
  let fixture: ComponentFixture<VacunasPerdidasAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasPerdidasAdminFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasPerdidasAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
