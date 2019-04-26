import { Component, OnInit } from '@angular/core';
import { Message } from "primeng/components/common/message";
import { NotaFiscalEletronicaService } from '../nota-fiscal-eletronica.service';

@Component({
  selector: 'app-nfe-upload',
  templateUrl: './nfe-upload.component.html',
  styleUrls: ['./nfe-upload.component.css']
})
export class NfeUploadComponent implements OnInit {

  statusMessages: Message[];
  agreement: boolean;

  constructor(public nfeService: NotaFiscalEletronicaService) {
    this.agreement = false;
  }

  ngOnInit() {
  }

  openFile(event) {
    let input = event.target;
    this.nfeService.readNFE(input);
    if (this.nfeService.produtos != null && this.nfeService.produtos.length > 0) {
      this.statusMessages.push({ severity: 'success', summary: 'DANFE importado com sucesso', detail: 'O próximo passo é informar os custos.' });
    }else{
      this.statusMessages.push({ severity: 'error', summary: 'Falha ao importar o DANFE', detail: 'Não é possível utilizar este DANFE.' });
    }
  }

  


}
