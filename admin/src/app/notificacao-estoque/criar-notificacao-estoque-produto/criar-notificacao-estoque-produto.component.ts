import { Component, OnInit } from '@angular/core';
import Cliente from 'src/app/models/cliente';
import Query from 'src/app/models/firestore/query';
import SolicitacaoNofitificacaoProduto from 'src/app/models/solicitacaoNotificacaoProduto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-notificacao-estoque-produto',
  templateUrl: './criar-notificacao-estoque-produto.component.html',
  styleUrls: ['./criar-notificacao-estoque-produto.component.css']
})
export class CriarNotificacaoEstoqueProdutoComponent implements OnInit {

  clientes:Cliente[];
  notificacao:SolicitacaoNofitificacaoProduto;

  constructor(private router:Router) { 

    this.notificacao = new SolicitacaoNofitificacaoProduto(null, new Cliente(null, "", "", ""), 0, false);

  }

  ngOnInit() {
  }

  search(event) {

    Cliente.getAll(new Query("telefone", "==", event.query)).subscribe(resultados=>{
      this.clientes = resultados;
    })

  }

  salvar(){
    this.notificacao.save().subscribe(resultado=>{
      // TODO: mudar para o message service
      alert("Alerta de notificação de lembrete de estoque cadastrado.");
      this.router.navigate(["main", { outlets: { main: ['notificacao-estoque-listagem'] } }])
    })
  }

}
