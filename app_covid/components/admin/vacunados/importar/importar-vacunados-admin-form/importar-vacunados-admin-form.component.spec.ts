import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarVacunadosAdminFormComponent } from './importar-vacunados-admin-form.component';

describe('ImportarVacunadosAdminFormComponent', () => {
  let component: ImportarVacunadosAdminFormComponent;
  let fixture: ComponentFixture<ImportarVacunadosAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarVacunadosAdminFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarVacunadosAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
