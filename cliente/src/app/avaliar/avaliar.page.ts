import { Component, OnInit } from '@angular/core';
import { Avaliacao } from 'src/model/avaliacao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.page.html',
  styleUrls: ['./avaliar.page.scss'],
})
export class AvaliarPage implements OnInit {

  avaliacao:Avaliacao;

  constructor(private router:Router) {
    this.avaliacao = new Avaliacao(null, 0);
  }

  ngOnInit() {
  }

  completeFeedback(event){

    this.avaliacao.save().subscribe(resultado=>{
      this.router.navigate(["agradecimento"]);
    })
    
  }

}
