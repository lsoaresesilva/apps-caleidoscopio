import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarNotificacaoEstoqueProdutoComponent } from './criar-notificacao-estoque-produto.component';

describe('CriarNotificacaoEstoqueProdutoComponent', () => {
  let component: CriarNotificacaoEstoqueProdutoComponent;
  let fixture: ComponentFixture<CriarNotificacaoEstoqueProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarNotificacaoEstoqueProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarNotificacaoEstoqueProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
