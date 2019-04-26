import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-agradecimento',
  templateUrl: './agradecimento.page.html',
  styleUrls: ['./agradecimento.page.scss'],
})
export class AgradecimentoPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    let _this = this;
    setTimeout( function() {
      _this.router.navigate([""]);
    }, 4000 );
  }

}
