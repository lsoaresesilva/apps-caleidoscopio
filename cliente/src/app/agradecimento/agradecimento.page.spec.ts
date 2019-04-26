import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgradecimentoPage } from './agradecimento.page';

describe('AgradecimentoPage', () => {
  let component: AgradecimentoPage;
  let fixture: ComponentFixture<AgradecimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgradecimentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgradecimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
