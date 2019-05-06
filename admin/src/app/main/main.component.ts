import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../tagplus/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  items: MenuItem[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private api: ApiService) {

    console.log("main")

   }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      let codigo = params['code'];
      if (codigo != undefined) {
        this.api.autenticar(codigo).subscribe(()=>{
          //this.api.vendas({dia:12, mes:6, ano:2018}, {dia:20, mes:6, ano:2018});
        })
      }

    });

    this.items = [
      {
        label: 'Calculadora',
        icon: 'pi pi-plus-circle',
        command: () => {
          this.router.navigate(["main", { outlets: { main: ['calculadora'] } }])
        }

      },
      {
        label: 'Pedidos',
        icon: 'pi pi-plus-circle',
        command: () => {
          this.router.navigate(["main", { outlets: { main: ['pedidos'] } }])
        }

      },
      {
        label: 'Cliente',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Cadastrar', icon: 'pi pi-fw pi-user-plus', command: () => {
              this.router.navigate(["main", { outlets: { main: ['cliente-cadastro'] } }])
            }
          },
          {
            label: 'Ver todos', icon: 'pi pi-fw pi-align-justify', command: () => {
              this.router.navigate(["main", { outlets: { main: ['cliente-listagem'] } }])
            }
          }
        ]
      },
      {
        label: 'Aviso de estoque',
        icon: 'pi pi-fw pi-bell',
        items: [
          {
            label: 'Cadastrar', icon: 'pi pi-fw pi-plus-circle', command: () => {
              this.router.navigate(["main", { outlets: { main: ['notificacao-estoque-cadastro'] } }])
            }
          },
          {
            label: 'Ver todos', icon: 'pi pi-fw pi-align-justify', command: () => {
              this.router.navigate(["main", { outlets: { main: ['notificacao-estoque-listagem'] } }])
            }
          }
        ]
      }
    ];
  }

}
