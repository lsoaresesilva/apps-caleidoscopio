import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCalculadoraComponent } from './main/main.component';
import { NfeUploadComponent } from './nfe-upload/nfe-upload.component';
import { CostsComponent } from './costs/costs.component';
import { ContributionMarginComponent } from './contribution-margin/contribution-margin.component';
import { PriceCalculationComponent } from './price-calculation/price-calculation.component';
import { ManualUploadComponent } from './manual-upload/manual-upload.component';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { NotaFiscalEletronicaService } from './nota-fiscal-eletronica.service';
import { FileUploadComponent } from './file-upload/file-upload.component';


import { GrowlModule, ButtonModule, InputTextModule } from 'primeng/primeng';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotificacaoEstoqueModule } from '../notificacao-estoque/notificacao-estoque.module';

import { HttpClientModule } from  '@angular/common/http';

@NgModule({
  declarations: [MainCalculadoraComponent,
    FileUploadComponent,
    NfeUploadComponent,
    CostsComponent,
    ContributionMarginComponent,
    PriceCalculationComponent,
    ManualUploadComponent,
    ProductUploadComponent,
    ManualUploadComponent
  ],
  imports: [
    CommonModule,
    GrowlModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TabMenuModule,
    TabViewModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    NotificacaoEstoqueModule,
    HttpClientModule
  ],
  exports:[MainCalculadoraComponent, ManualUploadComponent, ProductUploadComponent],
  providers:[NotaFiscalEletronicaService],
  
})
export class CalculadoraModule { }
