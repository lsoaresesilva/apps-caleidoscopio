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

  constructor(private router:Router) { }

  ngOnInit() {

    this.items = [
      {
          label: 'Calculadora',
          icon: 'pi pi-plus-circle', 
          command:()=>{
            this.router.navigate(["main", { outlets: { main: ['calculadora'] } }])
          }
          
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      }
  ];
  }

}
