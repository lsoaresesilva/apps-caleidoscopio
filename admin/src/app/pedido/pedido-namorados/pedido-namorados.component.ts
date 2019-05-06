import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/tagplus/api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pedido-namorados',
  templateUrl: './pedido-namorados.component.html',
  styleUrls: ['./pedido-namorados.component.css']
})
export class PedidoNamoradosComponent implements OnInit {


  vendasOrganizadasPorAno;

  constructor(private api: ApiService) { }

  organizarPorAno(vendas) {
    let vendasOrganizadas = {}

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

  ngOnInit() {

    /*let consultas = {};
    consultas["doismil17"] = this.api.vendas({ dia: 20, mes: 5, ano: 2017 }, { dia: 20, mes: 6, ano: 2017 });
    consultas["doismil18"] = this.api.vendas({ dia: 20, mes: 5, ano: 2018 }, { dia: 20, mes: 6, ano: 2018 });*/
    let periodos = [];
    periodos.push({ dia: 20, mes: 5, ano: 2017 }, { dia: 20, mes: 6, ano: 2017 });
    periodos.push({ dia: 20, mes: 5, ano: 2018 }, { dia: 20, mes: 6, ano: 2018 });

    //forkJoin(consultas).subscribe(vendas => {
      this.api.vendas(periodos).subscribe(vendas=>{
      let vendasOrganizadasPorAno = this.organizarPorAno(vendas);
      // TODO: adicionar valor 0 quando não tiver a categoria para um determinado ano.
      this.api.calcularEstoquePorCategoria(true).subscribe(categorias=>{
        for(let categoria in categorias){
          for(let cat in vendasOrganizadasPorAno){
            if(categoria == cat){
              vendasOrganizadasPorAno[cat]["estoque"] = categorias[categoria];
            }
          }
        }

        this.vendasOrganizadasPorAno = vendasOrganizadasPorAno;
      })
    })

    
  }

}
