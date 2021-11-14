import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorEstadalVacunasListComponent } from './visor-estadal-vacunas-list.component';

describe('VisorEstadalVacunasListComponent', () => {
  let component: VisorEstadalVacunasListComponent;
  let fixture: ComponentFixture<VisorEstadalVacunasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisorEstadalVacunasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorEstadalVacunasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
