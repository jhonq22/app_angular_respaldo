import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorEstadalReportesEstadalComponent } from './visor-estadal-reportes-estadal.component';

describe('VisorEstadalReportesEstadalComponent', () => {
  let component: VisorEstadalReportesEstadalComponent;
  let fixture: ComponentFixture<VisorEstadalReportesEstadalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisorEstadalReportesEstadalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorEstadalReportesEstadalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
