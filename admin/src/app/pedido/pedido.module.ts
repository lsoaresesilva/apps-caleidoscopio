import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoNamoradosComponent } from './pedido-namorados/pedido-namorados.component';

import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


import { ApiService } from '../tagplus/api.service';
import { PedidoContinuoComponent } from './pedido-continuo/pedido-continuo.component';

@NgModule({
  declarations: [PedidoNamoradosComponent, PedidoContinuoComponent],
  imports: [
    CommonModule,
    TableModule,
    ProgressSpinnerModule
  ],
  providers:[ApiService],
  exports:[PedidoNamoradosComponent, PedidoContinuoComponent]
})
export class PedidoModule { }
