import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroSaludAdminListComponent } from './centro-salud-admin-list.component';

describe('CentroSaludAdminListComponent', () => {
  let component: CentroSaludAdminListComponent;
  let fixture: ComponentFixture<CentroSaludAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroSaludAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroSaludAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
