import { Component, OnInit, Input } from '@angular/core';
import SolicitacaoNofitificacaoProduto from 'src/app/models/solicitacaoNotificacaoProduto';
import { Produto } from 'src/app/models/produto';
import Query from 'src/app/models/firestore/query';
import { forkJoin } from 'rxjs';
import { NotaFiscalEletronicaService } from 'src/app/calculadora/nota-fiscal-eletronica.service';

@Component({
  selector: 'app-avisos-notificacao',
  templateUrl: './avisos-notificacao.component.html',
  styleUrls: ['./avisos-notificacao.component.css']
})
export class AvisosNotificacaoComponent implements OnInit {

  

  constructor(public nfeService:NotaFiscalEletronicaService) { }

  ngOnInit() {
  }

}
