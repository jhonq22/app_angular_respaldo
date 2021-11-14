import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadalinventariosNoOperativosComponent } from './estadalinventarios-no-operativos.component';

describe('EstadalinventariosNoOperativosComponent', () => {
  let component: EstadalinventariosNoOperativosComponent;
  let fixture: ComponentFixture<EstadalinventariosNoOperativosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadalinventariosNoOperativosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadalinventariosNoOperativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
