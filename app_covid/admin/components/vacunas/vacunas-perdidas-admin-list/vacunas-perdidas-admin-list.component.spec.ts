import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasPerdidasAdminListComponent } from './vacunas-perdidas-admin-list.component';

describe('VacunasPerdidasAdminListComponent', () => {
  let component: VacunasPerdidasAdminListComponent;
  let fixture: ComponentFixture<VacunasPerdidasAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasPerdidasAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasPerdidasAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
