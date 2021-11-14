import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunadosMasterPatriaAdminFormComponent } from './vacunados-master-patria-admin-form.component';

describe('VacunadosMasterPatriaAdminFormComponent', () => {
  let component: VacunadosMasterPatriaAdminFormComponent;
  let fixture: ComponentFixture<VacunadosMasterPatriaAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunadosMasterPatriaAdminFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunadosMasterPatriaAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
