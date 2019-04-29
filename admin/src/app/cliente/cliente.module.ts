import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroClienteComponent } from './cadastro/cadastro.component';
import { DocumentModule } from '../models/firestore/document.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, Settings } from '@angular/fire/firestore';
import { config } from 'src/environments/firestore';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

import { ListagemClienteComponent } from './listar/listar.component';

@NgModule({
  declarations: [CadastroClienteComponent, ListagemClienteComponent],
  imports: [
    CommonModule,
    DocumentModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    BrowserAnimationsModule,
    DialogModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  exports: [CadastroClienteComponent, ListagemClienteComponent]
})
export class ClienteModule { 

  

}
