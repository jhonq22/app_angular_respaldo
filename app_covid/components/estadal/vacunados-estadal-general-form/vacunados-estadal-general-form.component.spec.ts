import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunadosEstadalGeneralFormComponent } from './vacunados-estadal-general-form.component';

describe('VacunadosEstadalGeneralFormComponent', () => {
  let component: VacunadosEstadalGeneralFormComponent;
  let fixture: ComponentFixture<VacunadosEstadalGeneralFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunadosEstadalGeneralFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunadosEstadalGeneralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
