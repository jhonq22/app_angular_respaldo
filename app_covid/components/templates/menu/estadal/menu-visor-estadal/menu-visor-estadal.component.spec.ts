import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVisorEstadalComponent } from './menu-visor-estadal.component';

describe('MenuVisorEstadalComponent', () => {
  let component: MenuVisorEstadalComponent;
  let fixture: ComponentFixture<MenuVisorEstadalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuVisorEstadalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVisorEstadalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
