import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRListPublicComponent } from './qrlist-public.component';

describe('QRListPublicComponent', () => {
  let component: QRListPublicComponent;
  let fixture: ComponentFixture<QRListPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QRListPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QRListPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
