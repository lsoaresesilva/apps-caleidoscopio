import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriarNotificacaoEstoqueProdutoComponent } from './criar-notificacao-estoque-produto/criar-notificacao-estoque-produto.component';
import { ListarNotificacaoEstoqueProdutoComponent } from './listar-notificacao-estoque-produto/listar.component';
import {CheckboxModule} from 'primeng/checkbox';

import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import {InputTextModule, DialogModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { AvisosNotificacaoComponent } from './avisos-notificacao/avisos-notificacao.component';

@NgModule({
  declarations: [CriarNotificacaoEstoqueProdutoComponent, ListarNotificacaoEstoqueProdutoComponent, AvisosNotificacaoComponent],
  imports: [
    CommonModule,
    CheckboxModule,
    AutoCompleteModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TableModule,
    DialogModule
  ],
  exports:[CriarNotificacaoEstoqueProdutoComponent, ListarNotificacaoEstoqueProdutoComponent, AvisosNotificacaoComponent]
})
export class NotificacaoEstoqueModule { }
