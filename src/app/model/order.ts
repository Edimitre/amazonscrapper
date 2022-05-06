import { Article } from "./article"
import { MarketPlace } from './market-place';

export class Order {


    id!:number
    
    denominazione!:string

    via!:string

    cap!:string

    citta!:string

    provincia! :string 

    telefono!:string 

    codice!:string
    
    data!:Date

    iva!:number

    subTotale!:number

    totale!:number

    notes!:string
    
    state!:string

    checked!:boolean

    articleList!:Article[]
    
    marketPlace!:MarketPlace


}
