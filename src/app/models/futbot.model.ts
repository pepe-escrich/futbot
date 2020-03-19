export interface Jugador {
    id: string;
    computer:boolean;
    name: string;
    lockColor?:string;
    daysToUnlock?:number;
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
    change?:number;
}