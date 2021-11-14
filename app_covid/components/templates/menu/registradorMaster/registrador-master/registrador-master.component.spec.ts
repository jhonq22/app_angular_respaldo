import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistradorMasterComponent } from './registrador-master.component';

describe('RegistradorMasterComponent', () => {
  let component: RegistradorMasterComponent;
  let fixture: ComponentFixture<RegistradorMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistradorMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistradorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
