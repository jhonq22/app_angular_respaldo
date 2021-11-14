import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarVacunadosAdminListComponent } from './importar-vacunados-admin-list.component';

describe('ImportarVacunadosAdminListComponent', () => {
  let component: ImportarVacunadosAdminListComponent;
  let fixture: ComponentFixture<ImportarVacunadosAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarVacunadosAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarVacunadosAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
