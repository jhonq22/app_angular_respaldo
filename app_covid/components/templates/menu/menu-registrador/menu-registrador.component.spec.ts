import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRegistradorComponent } from './menu-registrador.component';

describe('MenuRegistradorComponent', () => {
  let component: MenuRegistradorComponent;
  let fixture: ComponentFixture<MenuRegistradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRegistradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRegistradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
