import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-calculadora',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainCalculadoraComponent implements OnInit {

  items: MenuItem[];

  constructor(private router:Router) { }

  ngOnInit() {
    this.items = [
      {label: 'Informar produtos', icon: 'fa fa-fw fa-bar-chart', command:()=>{
        this.router.navigate(["calculadora", { outlets: { calculadorarouter: ['produtos'] } }])
      }},
    ];
  }

}
