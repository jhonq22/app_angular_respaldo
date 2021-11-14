import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVestadalComponent } from './menu-vestadal.component';

describe('MenuVestadalComponent', () => {
  let component: MenuVestadalComponent;
  let fixture: ComponentFixture<MenuVestadalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuVestadalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVestadalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
