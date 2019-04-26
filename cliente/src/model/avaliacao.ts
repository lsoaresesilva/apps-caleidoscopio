import {Document, Collection, date} from './firestore/document';

@Collection("avaliacoes")
export class Avaliacao extends Document{

    @date()
    data;

    constructor(id, private rate){
        super(id);
    }
}