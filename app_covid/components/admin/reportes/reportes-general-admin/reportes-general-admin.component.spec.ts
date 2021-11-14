import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesGeneralAdminComponent } from './reportes-general-admin.component';

describe('ReportesGeneralAdminComponent', () => {
  let component: ReportesGeneralAdminComponent;
  let fixture: ComponentFixture<ReportesGeneralAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesGeneralAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesGeneralAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
