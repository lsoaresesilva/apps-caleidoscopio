import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'avaliar', pathMatch: 'full' },
  { path: 'avaliar', loadChildren: './avaliar/avaliar.module#AvaliarPageModule' },
  { path: 'agradecimento', loadChildren: './agradecimento/agradecimento.module#AgradecimentoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
