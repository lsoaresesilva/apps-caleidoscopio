import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/tagplus/api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pedido-continuo',
  templateUrl: './pedido-continuo.component.html',
  styleUrls: ['./pedido-continuo.component.css']
})
export class PedidoContinuoComponent implements OnInit {

  vendasOrganizadasPorPeriodo;
  carregandoProdutos;

  constructor(private api: ApiService) { }

  organizarPorPeriodo(vendas) {
    let vendasOrganizadas = {}

    for (let i = 0; i < vendas.length; i++) {
      if (vendas[i].dataInicio != undefined && vendas[i].dataTermino != undefined) {

      }
    }

    for (let ano in vendas) {
      if (vendas[ano] != undefined) {
        for (let categoria in vendas[ano]) {

          if (vendas[ano][categoria] != undefined) {
            //let cat = categoria[0];
            //let quantidadeVendas = categoria[1];
            if (!vendasOrganizadas.hasOwnProperty(categoria)) {
              vendasOrganizadas[categoria] = []
            }

            if (!vendasOrganizadas[categoria].hasOwnProperty(ano)) {
              vendasOrganizadas[categoria][ano] = [];
            }

            vendasOrganizadas[categoria][ano] = vendas[ano][categoria]

          }


        }
      }
    }

    return vendasOrganizadas;
  }

  isPeriodosIguais(dataInicio, dataTermino) {
    if(dataInicio["ano"] == dataTermino["ano"] &&
      dataInicio["mes"] == dataTermino["mes"] &&
      dataInicio["dia"] == dataTermino["dia"]) {
        return true;
    }

    return false;
  }

  // TODO: fazer uma função para calcular a média por categoria

  

  agruparPorCategoria(vendasPorPeriodo) {
    let vendasPorCategoria = {}

    for (let i = 0; i < vendasPorPeriodo.length; i++) {
      for (let categoria in vendasPorPeriodo[i]["categorias"]) {
        if (!vendasPorCategoria.hasOwnProperty(categoria)) {
          vendasPorCategoria[categoria] = {};
          vendasPorCategoria[categoria]["periodos"] = []
        }

        if (vendasPorCategoria[categoria]["periodos"].length > 0 ) {
          let periodoInserido = false;
          for(let j = 0; j < vendasPorCategoria[categoria]["periodos"]; j++){
            let periodo = vendasPorCategoria[categoria]["periodos"][j];
           
          }
          
          
        }
        vendasPorCategoria[categoria]["periodo"]["dataInicio"] = vendasPorPeriodo[i]["dataInicio"]
        vendasPorCategoria[categoria]["periodo"]["dataTermino"] = vendasPorPeriodo[i]["dataTermino"]
      }
    }
  }

  ngOnInit() {

    this.carregandoProdutos = true;
    let periodos = [];
    periodos.push({ dataInicio: { dia: 1, mes: 0, ano: 2018 }, dataTermino: { dia: 31, mes: 0, ano: 2018 } })
    periodos.push({ dataInicio: { dia: 1, mes: 1, ano: 2018 }, dataTermino: { dia: 28, mes: 1, ano: 2018 } })
    periodos.push({ dataInicio: { dia: 1, mes: 2, ano: 2018 }, dataTermino: { dia: 31, mes: 2, ano: 2018 } })
    periodos.push({ dataInicio: { dia: 1, mes: 3, ano: 2018 }, dataTermino: { dia: 30, mes: 3, ano: 2018 } })
    periodos.push({ dataInicio: { dia: 1, mes: 6, ano: 2018 }, dataTermino: { dia: 30, mes: 6, ano: 2018 } })
    periodos.push({ dataInicio: { dia: 1, mes: 7, ano: 2018 }, dataTermino: { dia: 31, mes: 7, ano: 2018 } })
    periodos.push({ dataInicio: { dia: 1, mes: 8, ano: 2018 }, dataTermino: { dia: 30, mes: 8, ano: 2018 } })
    periodos.push({ dataInicio: { dia: 1, mes: 9, ano: 2018 }, dataTermino: { dia: 31, mes: 9, ano: 2018 } })
    periodos.push({ dataInicio: { dia: 1, mes: 10, ano: 2018 }, dataTermino: { dia: 30, mes: 10, ano: 2018 } })

    //forkJoin(consultas).subscribe(vendas => {
    this.api.vendasPeriodoContinuo(periodos).subscribe(vendas => {
      //TODO: agrupar por categoria
      this.vendasOrganizadasPorPeriodo = this.api.calcularMediaCategoriaPorPeriodos(vendas);
      //let vendasOrganizadasPorAno = this.organizarPorPeriodo(vendas);
      // TODO: adicionar valor 0 quando não tiver a categoria para um determinado ano.
      this.api.calcularEstoquePorCategoria(false).subscribe(categorias=>{ // TODO: salvar o estoque e atualizar a cada 3 dias ou ter um botão para atualizar na hora.
        for(let categoria in categorias){
          for(let j = 0; j < this.vendasOrganizadasPorPeriodo.length; j++){
            if(categoria == this.vendasOrganizadasPorPeriodo[j].categoria){
              this.vendasOrganizadasPorPeriodo[j]["estoque"] = categorias[categoria];
              this.vendasOrganizadasPorPeriodo[j]["pedido"] = this.vendasOrganizadasPorPeriodo[j]["media"]-this.vendasOrganizadasPorPeriodo[j]["estoque"]
            }
          }
        }

        function compare(a, b) {
          if (a.pedido < b.pedido) {
            return 1;
          }
          if (a.pedido > b.pedido) {
            return -1;
          }
          return 0;
        }
    
        this.vendasOrganizadasPorPeriodo.sort(compare);

        this.carregandoProdutos = false;

        //this.vendasOrganizadasPorAno = vendasOrganizadasPorAno;
      })
    })




  }

}
