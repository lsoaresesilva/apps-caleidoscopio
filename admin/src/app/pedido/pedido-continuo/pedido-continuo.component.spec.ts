import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoContinuoComponent } from './pedido-continuo.component';

describe('PedidoContinuoComponent', () => {
  let component: PedidoContinuoComponent;
  let fixture: ComponentFixture<PedidoContinuoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoContinuoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoContinuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
