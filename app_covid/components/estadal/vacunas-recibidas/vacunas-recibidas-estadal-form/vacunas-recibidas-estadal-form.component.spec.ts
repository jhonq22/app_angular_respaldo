import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasRecibidasEstadalFormComponent } from './vacunas-recibidas-estadal-form.component';

describe('VacunasRecibidasEstadalFormComponent', () => {
  let component: VacunasRecibidasEstadalFormComponent;
  let fixture: ComponentFixture<VacunasRecibidasEstadalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasRecibidasEstadalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasRecibidasEstadalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
