import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTallerNacionalComponent } from './menu-taller-nacional.component';

describe('MenuTallerNacionalComponent', () => {
  let component: MenuTallerNacionalComponent;
  let fixture: ComponentFixture<MenuTallerNacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTallerNacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTallerNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
