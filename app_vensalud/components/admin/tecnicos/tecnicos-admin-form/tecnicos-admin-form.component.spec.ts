import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosAdminFormComponent } from './tecnicos-admin-form.component';

describe('TecnicosAdminFormComponent', () => {
  let component: TecnicosAdminFormComponent;
  let fixture: ComponentFixture<TecnicosAdminFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicosAdminFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicosAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
