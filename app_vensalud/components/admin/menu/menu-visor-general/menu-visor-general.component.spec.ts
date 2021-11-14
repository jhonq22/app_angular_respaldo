import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVisorGeneralComponent } from './menu-visor-general.component';

describe('MenuVisorGeneralComponent', () => {
  let component: MenuVisorGeneralComponent;
  let fixture: ComponentFixture<MenuVisorGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuVisorGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVisorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
