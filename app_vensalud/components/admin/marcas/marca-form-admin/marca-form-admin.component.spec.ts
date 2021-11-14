import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaFormAdminComponent } from './marca-form-admin.component';

describe('MarcaFormAdminComponent', () => {
  let component: MarcaFormAdminComponent;
  let fixture: ComponentFixture<MarcaFormAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaFormAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
