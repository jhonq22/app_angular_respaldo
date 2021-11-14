import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasRecibidasListAdminComponent } from './vacunas-recibidas-list-admin.component';

describe('VacunasRecibidasListAdminComponent', () => {
  let component: VacunasRecibidasListAdminComponent;
  let fixture: ComponentFixture<VacunasRecibidasListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasRecibidasListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasRecibidasListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
