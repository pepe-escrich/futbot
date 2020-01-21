export interface Jugador {
    id: string;
    computer:boolean;
    name: string;
    points:number;
    role:string;
    slug:string;
    userteam:string;
    value:number;
    clausePrice?:number;
    clauseDate?:Date;
    comprar?:boolean;
    avg?:number;
    homeAvg?:number;
    awayAvg?:number;
    lastPts?:number[];
    lastFiveAvg?:number;
}