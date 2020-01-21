import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FutmondoService {

  constructor(public http: HttpClient) {
  }

  public obtenerJugadores(championshipId:string): Observable<any> {

    console.log('obtenerJugadores init');

    let body = JSON.parse('{"header":{},"query":{"championshipId":"'+championshipId+'"},"answer":{}}');
    return this.http.post<any>('https://www.futmondo.com/5/league/championshipplayers', body, { withCredentials: true });
  }

  public dameInfoCampeonato(): Observable<any> {

    console.log('dameInfoUsuario init');
    const fecha = new Date().toISOString();
    let body = JSON.parse('{"header":{"storeKey":"user_championships","expires":"' + fecha + '"},"query":{"excludeGeneral":false,"includeProphets":true,"storeKey":"user_championships","expires":"' + fecha + '"},"answer":{}}');
    return this.http.post<any>('https://www.futmondo.com/2/user/activechampionships', body, { withCredentials: true });
  }

  public pagarClausula(championshipId:string, usertTeamId: string, playerSlug: string, playerId: string, price: string): Observable<any> {

    console.log('pagarClausula init');

    let body = JSON.parse('{"header":{},"query":{"championshipId":"'+championshipId+'",' +
      '"userteamId":"' + usertTeamId + '","player_slug":"' + playerSlug + '","player_id":"' + playerId + '","price":"' + price + '"},"answer":{}}');
    return this.http.post<any>('https://www.futmondo.com/1/market/rosterclause', body, { withCredentials: true });
  }

}
