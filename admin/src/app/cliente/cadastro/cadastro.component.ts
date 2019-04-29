import { Component, OnInit } from '@angular/core';
import Cliente from 'src/app/models/cliente';
import { AlertPromise } from 'selenium-webdriver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroClienteComponent implements OnInit {

  cliente:Cliente;

  constructor(private router:Router) { 

    this.cliente = new Cliente(null, null, null, null);

  }

  ngOnInit() {
  }

  salvar(){
    if( this.cliente.validar() ){
      this.cliente.save().subscribe(resultado=>{
        alert("Cliente salvo com sucesso");
        this.router.navigate(["cadastro/listar"]);
      })
    }else{
      alert("Para salvar primeiro preencha os dados do cliente."); // TODO: usar o messageservice do Primeng
    }
  }

}
