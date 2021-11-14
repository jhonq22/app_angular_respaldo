import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesNacionalGeneralComponent } from './reportes-nacional-general.component';

describe('ReportesNacionalGeneralComponent', () => {
  let component: ReportesNacionalGeneralComponent;
  let fixture: ComponentFixture<ReportesNacionalGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesNacionalGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesNacionalGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
