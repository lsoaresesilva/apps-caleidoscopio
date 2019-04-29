import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotaFiscalEletronicaService } from '../nota-fiscal-eletronica.service';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {

  constructor(private router:Router, public nfeService:NotaFiscalEletronicaService) { }

  ngOnInit() {
  }

  openUpload(type:string){
    if(type == "manual"){
      this.router.navigate(['main/(main:calculadora)', { outlets: { main: ['produtoupload'] }} ])
    }else{
      this.router.navigate(['main/(main:calculadora)', { outlets: { main: ['produtoupload'] }}])
    }

  }

  setAgreement(event) {
    this.nfeService.setAgreement(event.target.checked);
  }

}
