import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild } from '@angular/core';
// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequestService } from '../../services/request.service';

import { DYNAMIC_TYPE } from '@angular/compiler';
import {
    ApexAxisChartSeries,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexChart,
    ApexPlotOptions
  } from 'ng-apexcharts';

  export interface ChartOptions {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    plotOptions: ApexPlotOptions;
  }
@Component({
  selector: 'app-chartbar2020',
  templateUrl: './chartbar2020.component.html',
  styleUrls: ['./chartbar2020.component.scss']
})
export class Chartbar2020Component {

    // @Input() dateParamMapDash: string;
    // @Input() cvegeoDash: string;
    // @Input() layerDash: string;
    // tot_edades

    // dateParamMap;
    // date_covid_acum

    // // grafica 2 bar ng2
    // public barChartOptions: ChartOptions = {
    //     responsive: true,
    //     scales: {
    //         yAxes: [{
    //             ticks: {
    //                 beginAtZero: true
    //             }
    //         }]
    //     },
    //     plugins: {
    //         datalabels: {
    //           anchor: 'end',
    //           align: 'end',
    //         }
    //       }
    // };
    // public barChartLabels: Label[] = ['Menor de 10', '10 a 19', '20 a 29', '30 a 39', '40 a 49',
    // }'50 a 59', '60 a 69', '70 a 79', '80 a 89', '90 a 99', '100 o más'];
    // public barChartType: ChartType = 'bar';
    // public barChartLegend = true;
    // public barChartPlugins = [];
    // public barChartData: ChartDataSets[] = [{}];
    // public barChartColors = [
    //     {
    //     backgroundColor: ['#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9',
    // '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9'],
    //     }
    // ];
    // grafica 2 bar ng2
    @ViewChild('chart') chart: Chartbar2020Component;
    public chartOptions: Partial<ChartOptions>;

    days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _requestService: RequestService ) {


            this.chartOptions = {
            series: [
              {
                name: '00:01 A 02:00',
                data: this.generateData(7, {
                  min: 2,
                  max: 55
                })
              },
              {
                name: '02:01 A 04:00',
                data: this.generateData(7, {
                  min: 2,
                  max: 55
                })
              },
              {
                name: '04:01 A 06:00',
                data: this.generateData(7, {
                  min: 2,
                  max: 55
                })
              },
              {
                name: '06:01 A 08:00',
                data: this.generateData(7, {
                  min: 2,
                  max: 55
                })
              },
              {
                name: '08:01 A 10:00',
                data: this.generateData(7, {
                  min: 2,
                  max: 55
                })
              },
              {
                name: '10:01 A 12:00',
                data: this.generateData(7, {
                  min: 2,
                  max: 55
                })
              },
              {
                name: '12:01 A 14:00',
                data: this.generateData(7, {
                  min: 2,
                  max: 55
                })
              },
              {
                name: '14:01 A 16:00',
                data: this.generateData(7, {
                  min: 2,
                  max: 55
                })
              },
              {
                name: '16:01 A 18:00',
                data: this.generateData(7, {
                  min: 0,
                  max: 55
                })
              },
              {
                name: '18:01 A 20:00',
                data: this.generateData(7, {
                  min: 0,
                  max: 55
                })
              },
              {
                name: '20:01 A 22:00',
                data: this.generateData(7, {
                  min: 0,
                  max: 55
                })
              },
              {
                name: '22:01 A 24:00',
                data: this.generateData(7, {
                  min: 0,
                  max: 55
                })
              }
            ],
            chart: {
              height: 350,
              type: 'heatmap'
            },
            plotOptions: {
              heatmap: {
                shadeIntensity: 0,
                colorScale: {
                  ranges: [
                    {
                      from: 0,
                      to: 19,
                      name: 'BAJO',
                      color: '#F2AE72'
                    },
                    {
                      from: 15,
                      to: 29,
                      name: 'MEDIO',
                      color: '#C48E82'
                    },
                    {
                      from: 30,
                      to: 45,
                      name: 'ALTO',
                      color: '#94718A'
                    },
                    {
                      from: 46,
                      to: 60,
                      name: 'EXTREMO',
                      color: '#61568D'
                    }
                  ]
                }
              }
            },
            dataLabels: {
              enabled: false
            },
            title: {
              text: 'SINISETROS POR RANGO DE HORA'
            }
          };

            // this._route.params.forEach(params => {

            //     var date_now = new Date(params.date.split('-')[0]);
            //     var layer = this._router.url.split('-')[1];

            //     this.date_covid_acum   = formatDate(date_now,'yyyyMMdd', 'en-US');

            //     this._requestService.acumEdades1(layer, this.date_covid_acum, this.cvegeoDash).subscribe(data => {
            //         data.features.forEach(feature => {
            //             this.graficaChartsJs(feature.properties)
            //         })
            //     })
            // })
    }
    public generateData(count, yrange) {
        let i = 0;

        const series: any[] = [];
        while (i < count) {


        //   let x: string = "Lunes" + (i + 1).toString();
          const y: string =
            Math.floor(Math.random() * (yrange.max - yrange.min)) + yrange.min;

          series.push({
            x: this.days[i],
            y: y
          });
          i++;
        }
        return series;
    }
    // ngOnChanges(changes: SimpleChanges): void {

    //     var layer = this._router.url.split('-')[1];

    //     switch(layer) {
    //         case 'nac': {
    //             layer = 'defacumedadesnac'

    //             this._requestService.acumEdades1(layer, this.date_covid_acum, this.cvegeoDash).subscribe(data => {
    //                 if(data.numberReturned == 0){
    //                     this.tot_edades = 'No hay casos';
    //                     this.barChartData  = [];
    //                 }else{
    //                     this._requestService.acumEdades1(layer, this.date_covid_acum, this.cvegeoDash).subscribe(data => {
    //                         data.features.forEach(feature => {
    //                             this.tot_edades = feature.properties.activos;
    //                             this.barChartData  = [
    //                                 { data: [feature.properties.menor10, feature.properties.e1019,
    //  feature.properties.e2029, feature.properties.e3039, feature.properties.e4049, feature.properties.e5059,
    //  feature.properties.e6069, feature.properties.e7079, feature.properties.e8089, feature.properties.e9099,
    //  feature.properties.emayor100], label : 'Total acumulados' }
    //                             ];
    //                             this.barChartColors = [
    //                                 {
    //                                 backgroundColor: ['#4D4D4D','#4D4D4D','#4D4D4D','#4D4D4D',
    // '#4D4D4D','#4D4D4D','#4D4D4D','#4D4D4D','#4D4D4D','#4D4D4D','#4D4D4D','#4D4D4D'],
    //                                 }
    //                             ];
    //                         })
    //                     })
    //                 }
    //             })
    //             break;
    //         }
    //         default: {
    //             this._requestService.acumEdades1(layer, this.date_covid_acum, this.cvegeoDash).subscribe(data => {
    //                 if(data.numberReturned == 0){
    //                     this.tot_edades = 'No hay casos';
    //                     this.barChartData  = [];

    //                 }else{

    //                     data.features.forEach(feature => {
    //                         this.tot_edades = feature.properties.activos;
    //                         this.barChartData  = [
    //                             { data: [feature.properties.menor10, feature.properties.e1019,
    // feature.properties.e2029, feature.properties.e3039, feature.properties.e4049, feature.properties.e5059,
    // feature.properties.e6069, feature.properties.e7079, feature.properties.e8089, feature.properties.e9099,
    // feature.properties.emayor100], label : 'Total acumulados' }
    //                         ];
    //                         if(layer == 'def'){
    //                             this.barChartColors = [
    //                                 {
    //                                 backgroundColor: ['#4D4D4D','#4D4D4D','#4D4D4D','#4D4D4D','#4D4D4D',
    // '#4D4D4D','#4D4D4D','#4D4D4D','#4D4D4D','#4D4D4D','#4D4D4D','#4D4D4D'],
    //                                 }
    //                             ];
    //                         }else{
    //                             this.barChartColors = [
    //                                 {
    //                                     backgroundColor: ['#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9',
    //  '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9', '#00A6D9'],
    //                                 }
    //                             ];
    //                         }
    //                     })
    //                 }
    //             })
    //             break;
    //         }
    //     }
    // }
    // graficaChartsJs(json){
    //     this.barChartData  = [
    //         { data: [json.menor10, json.e1019, json.e2029, json.e3039, json.e4049, json.e5059,
    //  json.e6069, json.e7079, json.e8089, json.e9099, json.emayor100], label : 'Total acumulados' }
    //     ];
    // }
}
