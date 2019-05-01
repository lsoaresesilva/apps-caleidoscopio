import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacaoTagplusComponent } from './autenticacao-tagplus.component';

describe('AutenticacaoTagplusComponent', () => {
  let component: AutenticacaoTagplusComponent;
  let fixture: ComponentFixture<AutenticacaoTagplusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutenticacaoTagplusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticacaoTagplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
