import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { Routes, RouterModule } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { CadastroClienteComponent } from './cliente/cadastro/cadastro.component';
import { ClienteModule } from './cliente/cliente.module';
import { CalculadoraModule } from './calculadora/calculadora.module';
import { ManualUploadComponent } from './calculadora/manual-upload/manual-upload.component';
import { NfeUploadComponent } from './calculadora/nfe-upload/nfe-upload.component';
import { ListagemClienteComponent } from './cliente/listar/listar.component';
import { CriarNotificacaoEstoqueProdutoComponent } from './notificacao-estoque/criar-notificacao-estoque-produto/criar-notificacao-estoque-produto.component';
import { NotificacaoEstoqueModule } from './notificacao-estoque/notificacao-estoque.module';
import { ListarNotificacaoEstoqueProdutoComponent } from './notificacao-estoque/listar-notificacao-estoque-produto/listar.component';

import { MenubarModule } from 'primeng/menubar';
import { MainCalculadoraComponent } from './calculadora/main/main.component';
import { MainComponent } from './main/main.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MensagensAvisoService } from './calculadora/mensagens-aviso.service';

const routes: Routes = [
  { path: "", component: AppComponent }, 
  { path: 'notificacao-estoque/criar', component: CriarNotificacaoEstoqueProdutoComponent },
  { path: 'notificacao-estoque/listar', component: ListarNotificacaoEstoqueProdutoComponent },
  { path: 'cliente/cadastro', component: CadastroClienteComponent },
  { path: 'cliente/listagem', component: ListagemClienteComponent },
  {
    path: "main", component: MainComponent, children: [
      {
        path: 'calculadora', component: MainCalculadoraComponent, outlet: "main", children: [
          { path: 'manual-upload', component: ManualUploadComponent, outlet: "produtoupload" },
          { path: 'nfe-upload', component: NfeUploadComponent, outlet: "produtoupload" }
        ]
      }
    ]
  }, 
];

@NgModule({
  declarations: [
    AppComponent, MainComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ClienteModule,
    CalculadoraModule,
    MenubarModule,
    NotificacaoEstoqueModule,
    MessagesModule,
    MessagesModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  providers: [MensagensAvisoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
