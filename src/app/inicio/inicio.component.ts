import { Jugador } from './../models/futbot.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FutmondoService } from '../services/futmondo.service';
import * as moment from 'moment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, OnDestroy {

  jugadores: Jugador[] = [];
  championshipId: string;
  userTeamId: string;

  interval;
  intervalMillis = 200;

  minHoraComprar: moment.Moment;
  maxHoraComprar: moment.Moment;

  diasDesbloqueo = 1;

  w;

  constructor(private futmondoService: FutmondoService) { }

  ngOnInit() {
    this.startTimer();
  }
  ngOnDestroy() {
    this.pauseTimer();
  }

  onClickLogin() {
    this.w = window.open("https://www.futmondo.com/");
  }

  onClickCargar() {

    this.futmondoService.dameInfoCampeonato().subscribe(result => {
      this.championshipId = result.answer.championships[0].id;
      this.userTeamId = result.answer.championships[0].userteam.id;
      console.log("championshipId=" + this.championshipId);
      console.log("userTeamId=" + this.userTeamId);

      const fechaMinDesbloqueo: moment.Moment = moment();

      fechaMinDesbloqueo.add(this.diasDesbloqueo, 'day');

      this.minHoraComprar = moment().hours(23).minutes(59).seconds(55).milliseconds(0);
      this.maxHoraComprar = this.minHoraComprar.clone().add(2, 'minutes');


      this.jugadores = [];
      this.futmondoService.obtenerJugadores(this.championshipId).subscribe(result => {
        // console.table(result.answer.players);
        result.answer.players.forEach(item => {
          let lockColor: string;

          if (item.computer) {
            return;
          }
          if (item.clause.transferred) {
            return;
          }

          if(new Date(item.clause.date) < new Date()){
            lockColor = '#17773d';
          } else {
            lockColor = '#bf0000';
          }
          
          const fecha = moment(item.clause.date);
          if (fecha.isAfter(fechaMinDesbloqueo)) {
            return;
          }

          const jugador: Jugador = {
            id: item.id, computer: item.computer, name: item.name, points: item.points, role: item.role,
            slug: item.slug, userteam: item.userteam, value: item.value, clauseDate: new Date(item.clause.date), clausePrice: item.clause.price, avg: item.average.average,
            homeAvg: item.average.homeAverage, awayAvg: item.average.awayAverage, lastFiveAvg: item.average.averageLastFive, lastPts: item.average.fitness, lockColor: lockColor,
            daysToUnlock: (Math.ceil( (new Date(item.clause.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)))
          };
          this.jugadores.push(jugador);

        });

        this.jugadores = this.jugadores.sort((a, b) => {
          return b.clauseDate.getTime() - a.clauseDate.getTime();
        });

      });
    });


  }

  pagarClausula(jugador: Jugador) {
    this.futmondoService.pagarClausula(this.championshipId, this.userTeamId,
      jugador.slug, jugador.id, String(jugador.clausePrice)).subscribe(result => {
        console.log(result);
        if (result.answer.code === 'api.general.ok') {
          jugador.comprar = false;
        }
      });
  }

  startTimer() {
    let i = 0;
    this.interval = setInterval(() => {

      const ahora: moment.Moment = moment();
      if (ahora.isAfter(this.minHoraComprar) && ahora.isBefore(this.maxHoraComprar)) {
        this.jugadores.forEach(j => {
          if (j.comprar) {
            this.pagarClausula(j);
          }
        });
      }
      i++;
      if (i % 1000 == 0) {
        console.log("START reloading futmondo window");
        this.futmondoService.dameInfoCampeonato().subscribe(result => {
          console.log("END reloading futmondo window");
        });
        
      }

    }, this.intervalMillis)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}
