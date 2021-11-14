import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasRecibidasRegistradorListComponent } from './vacunas-recibidas-registrador-list.component';

describe('VacunasRecibidasRegistradorListComponent', () => {
  let component: VacunasRecibidasRegistradorListComponent;
  let fixture: ComponentFixture<VacunasRecibidasRegistradorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasRecibidasRegistradorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasRecibidasRegistradorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
