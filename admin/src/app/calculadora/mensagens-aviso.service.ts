import { Injectable } from '@angular/core';
import {Message} from 'primeng//api';

@Injectable()
export class MensagensAvisoService {

  public mensagens:Message[];

  constructor() { 

    this.mensagens = [];

  }

}
