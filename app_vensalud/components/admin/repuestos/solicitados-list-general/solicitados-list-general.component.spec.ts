import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitadosListGeneralComponent } from './solicitados-list-general.component';

describe('SolicitadosListGeneralComponent', () => {
  let component: SolicitadosListGeneralComponent;
  let fixture: ComponentFixture<SolicitadosListGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitadosListGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitadosListGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
