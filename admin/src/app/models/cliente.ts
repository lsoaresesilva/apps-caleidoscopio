import { Document, Collection, date } from './firestore/document';

@Collection("clientes")
export default class Cliente extends Document{

    @date()
    dataCadastro;

    constructor(id, public nome, public email, public telefone){
        super(id);
    }

    validar(){
        if(this.nome != "" && this.nome != undefined && this.email != "" && this.email != undefined && this.telefone != "" && this.telefone != undefined){
            return true;
        }

        return false;
    }

    toString(){
        return this.nome;
    }

}