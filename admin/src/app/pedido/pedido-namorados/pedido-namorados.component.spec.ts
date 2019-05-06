import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoNamoradosComponent } from './pedido-namorados.component';

describe('PedidoNamoradosComponent', () => {
  let component: PedidoNamoradosComponent;
  let fixture: ComponentFixture<PedidoNamoradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoNamoradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoNamoradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
