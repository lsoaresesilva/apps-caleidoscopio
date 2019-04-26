import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AvaliarPage } from './avaliar.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { config } from 'src/environments/firestore';
import { DocumentModule } from 'src/model/firestore/document.module';


import { IonicRatingModule } from 'ionic4-rating';

const routes: Routes = [
  {
    path: '',
    component: AvaliarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentModule,

    IonicRatingModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule.enablePersistence()
  ],
  declarations: [AvaliarPage]
})
export class AvaliarPageModule {}
