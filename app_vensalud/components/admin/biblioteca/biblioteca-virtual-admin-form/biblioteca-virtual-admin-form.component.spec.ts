import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaVirtualAdminFormComponent } from './biblioteca-virtual-admin-form.component';

describe('BibliotecaVirtualAdminFormComponent', () => {
  let component: BibliotecaVirtualAdminFormComponent;
  let fixture: ComponentFixture<BibliotecaVirtualAdminFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliotecaVirtualAdminFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecaVirtualAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
