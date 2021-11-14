import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarVacunadosAdminEditComponent } from './importar-vacunados-admin-edit.component';

describe('ImportarVacunadosAdminEditComponent', () => {
  let component: ImportarVacunadosAdminEditComponent;
  let fixture: ComponentFixture<ImportarVacunadosAdminEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarVacunadosAdminEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarVacunadosAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
