import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunadosEstadalGeneraListComponent } from './vacunados-estadal-genera-list.component';

describe('VacunadosEstadalGeneraListComponent', () => {
  let component: VacunadosEstadalGeneraListComponent;
  let fixture: ComponentFixture<VacunadosEstadalGeneraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunadosEstadalGeneraListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunadosEstadalGeneraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
