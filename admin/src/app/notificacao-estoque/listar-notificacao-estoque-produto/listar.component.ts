import { Component, OnInit } from '@angular/core';
import Cliente from 'src/app/models/cliente';
import SolicitacaoNofitificacaoProduto from 'src/app/models/solicitacaoNotificacaoProduto';

@Component({
  selector: 'listar-notificacao-estoque-produto',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarNotificacaoEstoqueProdutoComponent implements OnInit {

  notificacoes:SolicitacaoNofitificacaoProduto[];
  notificacao:SolicitacaoNofitificacaoProduto;
  displayDialog = false;

  constructor() { 
    this.notificacao = new SolicitacaoNofitificacaoProduto(null, new Cliente(null, "", "", ""), "", false);

  }

  ngOnInit() {

    SolicitacaoNofitificacaoProduto.getAll().subscribe(resultados=>{
      this.notificacoes = resultados;
    });

  }

  onRowSelect(event) {
    
    this.notificacao = event.data;
    this.displayDialog = true;
  }

  atualizar(){
    if(this.notificacao != undefined){
      this.notificacao.save().subscribe(resultado=>{
        this.displayDialog = false;
      })
    }
  }

  deletar(){
    if(this.notificacao != undefined && typeof this.notificacao.pk === "function"){
      SolicitacaoNofitificacaoProduto.delete(this.notificacao.pk()).subscribe(resultado=>{
        SolicitacaoNofitificacaoProduto.getAll().subscribe(resultados=>{
          this.notificacoes = resultados;
          this.displayDialog = false;
        })
        
      })
    }
  }

}
