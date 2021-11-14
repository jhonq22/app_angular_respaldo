import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVisorComponent } from './menu-visor.component';

describe('MenuVisorComponent', () => {
  let component: MenuVisorComponent;
  let fixture: ComponentFixture<MenuVisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuVisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
