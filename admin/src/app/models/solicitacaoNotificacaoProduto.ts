import Cliente from './cliente';
import { oneToOne, Document, Collection } from './firestore/document';
import { Produto } from './produto';

@Collection("solicitacoesProdutosEstoque")
export default class SolicitacaoNofitificacaoProduto extends Document{

    @oneToOne({name:"clienteId", type:Cliente})
    cliente:Cliente; 

    produto:Produto;

    constructor(id, cliente, public codigoProduto, public notificado){
        super(id);
        this.cliente = cliente;
        
    }
}