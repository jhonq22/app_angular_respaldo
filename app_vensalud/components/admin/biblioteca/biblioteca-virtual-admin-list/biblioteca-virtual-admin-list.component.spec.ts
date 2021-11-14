import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaVirtualAdminListComponent } from './biblioteca-virtual-admin-list.component';

describe('BibliotecaVirtualAdminListComponent', () => {
  let component: BibliotecaVirtualAdminListComponent;
  let fixture: ComponentFixture<BibliotecaVirtualAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliotecaVirtualAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecaVirtualAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
