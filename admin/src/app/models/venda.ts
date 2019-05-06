import { Document, Collection } from './firestore/document';

@Collection("vendas")
export default class Venda extends Document{
    
    constructor(id, public dados, public periodo){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["dados"] = this.dados;
        document["periodo"] = this.periodo;

        return document;
    }
}