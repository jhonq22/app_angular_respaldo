import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasPerdidasRegistradorListComponent } from './vacunas-perdidas-registrador-list.component';

describe('VacunasPerdidasRegistradorListComponent', () => {
  let component: VacunasPerdidasRegistradorListComponent;
  let fixture: ComponentFixture<VacunasPerdidasRegistradorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunasPerdidasRegistradorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasPerdidasRegistradorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
