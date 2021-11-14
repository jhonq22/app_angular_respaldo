import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosAdminListComponent } from './tecnicos-admin-list.component';

describe('TecnicosAdminListComponent', () => {
  let component: TecnicosAdminListComponent;
  let fixture: ComponentFixture<TecnicosAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicosAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicosAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
