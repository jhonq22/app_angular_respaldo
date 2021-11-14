import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEspecialesAdminListComponent } from './grupo-especiales-admin-list.component';

describe('GrupoEspecialesAdminListComponent', () => {
  let component: GrupoEspecialesAdminListComponent;
  let fixture: ComponentFixture<GrupoEspecialesAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoEspecialesAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoEspecialesAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
