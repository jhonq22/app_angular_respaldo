import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaListAdminComponent } from './marca-list-admin.component';

describe('MarcaListAdminComponent', () => {
  let component: MarcaListAdminComponent;
  let fixture: ComponentFixture<MarcaListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
