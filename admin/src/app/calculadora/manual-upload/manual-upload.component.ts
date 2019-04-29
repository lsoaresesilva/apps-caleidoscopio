import { Component, OnInit } from '@angular/core';
import { Message } from "primeng/components/common/message";
import { NotaFiscalEletronicaService } from '../nota-fiscal-eletronica.service';
import { Produto } from '../../models/produto';
import { MensagensAvisoService } from '../mensagens-aviso.service';

@Component({
  selector: 'app-manual-upload',
  templateUrl: './manual-upload.component.html',
  styleUrls: ['./manual-upload.component.css']
})
export class ManualUploadComponent implements OnInit {


  constructor(public nfeService: NotaFiscalEletronicaService, private messageService: MensagensAvisoService) { 
    this.nfeService.resetarProdutos();
  }

  ngOnInit() {

  }

  addProduct(productName, productCost, productIPI) {
    if (productName.value == "" || productCost.value == "" || productIPI.value == "") {
      this.messageService.mensagens.push({ severity: 'error', summary: 'Erro ao adicionar produto', detail: 'Nome do produto ou valor não podem estar em branco.' });
    } else {
      let product = new Produto(this.nfeService.nfe);
      product.descricao = productName.value;
      product.valorUnitario = Number(productCost.value);
      product.ipi = Number(productIPI.value);
      this.nfeService.addProduct(product);
      productName.value = "";
      productCost.value = "";
      productIPI.value = "0";
    }
  }

  removerProduto(index){
    this.nfeService.removerProduto(index);
  }

}
