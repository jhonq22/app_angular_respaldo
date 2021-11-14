import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRegistradorEstadalComponent } from './menu-registrador-estadal.component';

describe('MenuRegistradorEstadalComponent', () => {
  let component: MenuRegistradorEstadalComponent;
  let fixture: ComponentFixture<MenuRegistradorEstadalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRegistradorEstadalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRegistradorEstadalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
