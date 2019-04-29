import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosNotificacaoComponent } from './avisos-notificacao.component';

describe('AvisosNotificacaoComponent', () => {
  let component: AvisosNotificacaoComponent;
  let fixture: ComponentFixture<AvisosNotificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisosNotificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisosNotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
