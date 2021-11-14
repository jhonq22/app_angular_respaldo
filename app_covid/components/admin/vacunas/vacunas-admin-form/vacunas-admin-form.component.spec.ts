import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasAdminFormComponent } from './vacunas-admin-form.component';

describe('VacunasAdminFormComponent', () => {
  let component: VacunasAdminFormComponent;
  let fixture: ComponentFixture<VacunasAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasAdminFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
