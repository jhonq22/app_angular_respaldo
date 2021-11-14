import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCargaMasivaComponent } from './menu-carga-masiva.component';

describe('MenuCargaMasivaComponent', () => {
  let component: MenuCargaMasivaComponent;
  let fixture: ComponentFixture<MenuCargaMasivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCargaMasivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCargaMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
