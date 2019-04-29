import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  items: MenuItem[];

  constructor(private router: Router) { }

  ngOnInit() {

    this.items = [
      {
        label: 'Calculadora',
        icon: 'pi pi-plus-circle',
        command: () => {
          this.router.navigate(["main", { outlets: { main: ['calculadora'] } }])
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
