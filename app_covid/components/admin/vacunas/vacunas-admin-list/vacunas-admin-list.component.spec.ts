import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasAdminListComponent } from './vacunas-admin-list.component';

describe('VacunasAdminListComponent', () => {
  let component: VacunasAdminListComponent;
  let fixture: ComponentFixture<VacunasAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
