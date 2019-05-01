import { Component, OnInit } from '@angular/core';
import { NotaFiscalEletronicaService } from '../nota-fiscal-eletronica.service';
import { Produto } from '../../models/produto';
import { HttpClient, HttpHeaders } from  "@angular/common/http";

@Component({
  selector: 'app-price-calculation',
  templateUrl: './price-calculation.component.html',
  styleUrls: ['./price-calculation.component.css']
})
export class PriceCalculationComponent implements OnInit {

  constructor(public nfeService:NotaFiscalEletronicaService, private http:HttpClient) { }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
         'Access-Control-Allow-Origin':'*'
      })
    };
    /*this.http.post("https://developers.tagplus.com.br/authorize?response_type=code&client_id=d1bpJLukHoX9ppCG87iFrvUXPTw9CO8L&scope=write:produtos+read:pedidos", httpOptions).subscribe(resultado=>{
      console.log(resultado);
    })*/


  }

  atualizarMargemContribuicao(produto: Produto) {
        this.nfeService.atualizarMargemContribuicao(produto);
    }

}
