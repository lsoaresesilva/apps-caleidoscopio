import { Document, Collection, date } from './firestore/document';

@Collection("estoqueCategorias")
export default class EstoqueCategorias extends Document{

    @date()
    data

    constructor(id, public categorias){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["categorias"] = this.categorias;
        return document;
    }
}