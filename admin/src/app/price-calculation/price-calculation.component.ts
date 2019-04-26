import { Component, OnInit } from '@angular/core';
import { NotaFiscalEletronicaService } from '../nota-fiscal-eletronica.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-price-calculation',
  templateUrl: './price-calculation.component.html',
  styleUrls: ['./price-calculation.component.css']
})
export class PriceCalculationComponent implements OnInit {

  constructor(public nfeService:NotaFiscalEletronicaService) { }

  ngOnInit() {
  }

  atualizarMargemContribuicao(produto: Produto) {
        this.nfeService.atualizarMargemContribuicao(produto);
    }

}
