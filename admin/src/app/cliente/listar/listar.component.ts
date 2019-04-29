import { Component, OnInit } from '@angular/core';
import Cliente from 'src/app/models/cliente';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListagemClienteComponent implements OnInit {

  clientes:Cliente[];
  cliente:Cliente;
  displayDialog = false;

  constructor() { }

  ngOnInit() {

    Cliente.getAll().subscribe(resultados=>{
      this.clientes = resultados;
    });

  }

  onRowSelect(event) {
    
    this.cliente = event.data;
    this.displayDialog = true;
  }

  atualizar(){
    if(this.cliente != undefined){
      this.cliente.save().subscribe(resultado=>{
        this.displayDialog = false;
      })
    }
  }

  deletar(){
    if(this.cliente != undefined && typeof this.cliente.pk === "function"){
      Cliente.delete(this.cliente.pk()).subscribe(resultado=>{
        Cliente.getAll().subscribe(resultados=>{
          this.clientes = resultados;
          this.displayDialog = false;
        })
        
      })
    }
  }

}
