import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autenticacao-tagplus',
  templateUrl: './autenticacao-tagplus.component.html',
  styleUrls: ['./autenticacao-tagplus.component.css']
})
export class AutenticacaoTagplusComponent implements OnInit {

  constructor() { 
    //window.location.href = "https://developers.tagplus.com.br/authorize?response_type=code&client_id=oX6QIY14uNv9QPbGeMQ0Itxw4RpYrMVm&scope=write:produtos+read:pedidos";

  }

  ngOnInit() {
  }

}
