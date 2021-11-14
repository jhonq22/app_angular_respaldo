import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroSaludAdminFormComponent } from './centro-salud-admin-form.component';

describe('CentroSaludAdminFormComponent', () => {
  let component: CentroSaludAdminFormComponent;
  let fixture: ComponentFixture<CentroSaludAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroSaludAdminFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroSaludAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
