import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNacionalComponent } from './menu-nacional.component';

describe('MenuNacionalComponent', () => {
  let component: MenuNacionalComponent;
  let fixture: ComponentFixture<MenuNacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuNacionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
