import { Component } from '@angular/core';
import { MensagensAvisoService } from './calculadora/mensagens-aviso.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  msgs:Message[];

  constructor(private messageService:MensagensAvisoService){
    this.msgs = this.messageService.mensagens;
  }
}
