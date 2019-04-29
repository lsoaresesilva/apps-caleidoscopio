import {NFE} from './nfe'

export class Produto{

    codigo;
    descricao:String;
    quantidade:number;
    valorUnitario:number;
    valorVenda:number;
    icms:number;
    ipi:number;
    margemContribuicao:number;
    nfe:NFE;

    constructor(nfe:NFE){
        this.nfe = nfe
        this.valorVenda = 0;
        this.quantidade = 0;
    }

    


    

    
}