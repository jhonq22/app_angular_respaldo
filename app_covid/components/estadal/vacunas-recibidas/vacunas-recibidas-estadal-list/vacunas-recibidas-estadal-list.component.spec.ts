import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasRecibidasEstadalListComponent } from './vacunas-recibidas-estadal-list.component';

describe('VacunasRecibidasEstadalListComponent', () => {
  let component: VacunasRecibidasEstadalListComponent;
  let fixture: ComponentFixture<VacunasRecibidasEstadalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasRecibidasEstadalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasRecibidasEstadalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
