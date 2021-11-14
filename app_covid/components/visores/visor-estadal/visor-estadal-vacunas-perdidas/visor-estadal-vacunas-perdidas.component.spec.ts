import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorEstadalVacunasPerdidasComponent } from './visor-estadal-vacunas-perdidas.component';

describe('VisorEstadalVacunasPerdidasComponent', () => {
  let component: VisorEstadalVacunasPerdidasComponent;
  let fixture: ComponentFixture<VisorEstadalVacunasPerdidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisorEstadalVacunasPerdidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorEstadalVacunasPerdidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
