import { Collection, Document } from "./firestore/document";

@Collection("vendasAgrupadasPeriodo")
export default class VendasPeriodo extends Document {
    constructor(id, private dataInicio, private dataTermino, public categorias) {
        super(id);
    }

    objectToDocument() {
        let document = super.objectToDocument();
        document["dataInicio"] = this.dataInicio;
        document["dataTermino"] = this.dataTermino;
        document["categorias"] = this.categorias;
        return document;
    }
}