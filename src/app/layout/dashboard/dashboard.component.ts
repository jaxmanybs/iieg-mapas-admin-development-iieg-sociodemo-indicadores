import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { forkJoin, Subscription } from 'rxjs';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { DatePipe } from '@angular/common';

import { take, filter } from 'rxjs/operators';
// services
import { RequestService } from '../services/request.service';
import { DateService } from './../services/date.service';

import { MatRadioChange } from '@angular/material/radio';

// import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LabelType, Options } from 'ng5-slider';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { BottonSheetExampleComponent } from './botton-sheet-example/botton-sheet-example.component';
import { SpinnerService } from '../services/spinner.service';
import { CalendarView, DAYS_OF_WEEK, CalendarEvent } from 'angular-calendar';
import * as moment from 'moment';

// lgtb
import { RadialChartOptions } from 'chart.js';

interface Worker {
    value: string;
    name: string;
}

const colors: any = {
    blue1: {
        primary: '#2603c1',
        secondary: '#2603c1',
    },
    blue2: {
        primary: '#1e90ff',
        secondary: '#1e90ff',
    },
    yellow: {
        primary: '#fffb00',
        secondary: '#fffb00',
    },
};

const lgtbColors: any = {
    yellow: '#FFC600',
    orange: '#FF893A',
    green: '#57B89C',
    red: '#FF0441',
    gray: '##E1E3E5',
};

const sinisterColors: any = {
    hombres: '#003399',
    mujeres: '#e70d4b',
    peaton: '#91B0D9',
    pasajero: '#262840',
    motociclista: '#61568D',
    conductor: '#F08077',
    ciclista: '#F2AE72',
};
export interface Section {
    name: string;
    sinisterColor: string;
    sinisterIcon: string;
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    // Radar
    public radarChartOptions: RadialChartOptions = {
        responsive: true,
        scale: {
            ticks: { display: false, stepSize: 5 },
        }
    };

    public radarChartOptionsMun: RadialChartOptions = {
        responsive: true,
        scale: {
            pointLabels: {
                fontColor: 'black'
            },
            ticks: { display: false, suggestedMin: 0, suggestedMax: 1, stepSize: 1 },


            // gridLines: { display: false }
            // display: false,
            // angleLines: {
            // borderDash: [8],
            // color: 'red',
            //     display: false,
            // }
        }
    };

    public radarChartLabels: Label[] = [
        'Visibilización',
        'Capacitación',
        'Reglamentos',
        'Plan Municipal',
        'Participación ciudadana',
        'Atención',
        'Políticas públicas',
        'Programas sociales',
        'Mecanismos contra discriminación',
        'Presupuesto',
        'Estadística',
        'Recursos humanos',
        'Participación política'];

    public radarChartData: ChartDataSets[] = [
        // { data: [12, 12, 10, 9, 7, 22, 8, 23, 15, 12, 9, 0], label: 'Jalisco' },
        { data: [], label: 'Jalisco' },
        // { data: [3, 3, 1, 2, 3, 2, 3, 3, 3, 2, 2, 3, 2], label: 'Zapopan' },
    ];
    public radarChartType: ChartType = 'radar';
    public radarChartColors = [
        {
            backgroundColor: '#ff893a40',
            borderColor: '#FF893A',
            pointBackgroundColor: '#FF893A',
            pointBorderColor: '#FF893A',
            pointHoverBackgroundColor: '#C768DC',

        },
    ];
    public pointLabels = [
        {

            pointLabels: '#C768DC'
        }
    ];

    // radar mun
    public radarChartDataMun: ChartDataSets[] = [
        { data: [], label: '' },
        // { data: [3, 3, 1, 2, 3, 2, 3, 3, 3, 2, 2, 3, 2], label: 'Zapopan' },
    ];
    // radar AMG
    public radarChartOptionsAMG: RadialChartOptions = {
        responsive: true,
        scale: {
            ticks: { display: false, stepSize: 5 },
        }
    };
    public radarChartDataAMG: ChartDataSets[] = [
        { data: [6, 6, 2, 3, 4, 2, 3, 2, 3, 1, 2, 5, 5], label: 'AMG' },
        // { data: [], label: 'Jalisco' },
        // { data: [3, 3, 1, 2, 3, 2, 3, 3, 3, 2, 2, 3, 2], label: 'Zapopan' },
    ];
    public radarChartTypeAMG: ChartType = 'radar';
    public radarChartColorsAMG = [
        {
            backgroundColor: '#ff893a40',
            borderColor: '#FF893A',
            pointBackgroundColor: '#FF893A',
            pointBorderColor: '#FF893A',
            pointHoverBackgroundColor: '#C768DC',

        },
    ];
    public radarChartLabelsAMG: Label[] = [
        'Visibilización',
        'Capacitación',
        'Reglamentos',
        'Plan Municipal',
        'Participación ciudadana',
        'Atención',
        'Políticas públicas',
        'Programas sociales',
        'Mecanismos contra discriminación',
        'Presupuesto',
        'Estadística',
        'Recursos humanos',
        'Participación política'];


    //////////////////////// transpaente /////////////////////////////////
    // filtrado
    layer: string;





    ////////////////
    listarPaises: any[];
    intersections = 0;
    sinistries = 0;
    wounds = 0;

    externalData = [];
    minDate1 = new Date(2017, 7, 31);
    maxDate1 = new Date(2020, 6, 30);
    minDate2 = new Date(2017, 7, 31);
    maxDate2 = new Date(2020, 6, 30);
    minHorary1 = new Date(2017, 7, 31);
    maxHorary1 = new Date(2020, 6, 30);
    minHorary2 = new Date(2017, 7, 31);
    maxHorary2 = new Date(2020, 6, 30);

    formGroup: FormGroup = new FormGroup({
        start_date: new FormControl(''),
        end_date: new FormControl('', Validators.required),
        mun: new FormControl('', Validators.required),
        consequence: new FormControl('', Validators.required),
        user_type: new FormControl('', Validators.required),
        workers: new FormControl('', Validators.required)
    });

    //
    avg;
    avgAMG;
    avgFlag;
    indice;
    chartIndiceHeight;
    graficPie;
    graficRadar2;
    dataFilterDash;
    responseYes;
    responseNo;
    responseNotYet;
    questionSelected;
    questions = [
        '¿El municipio ha tomado acciones para la visibilización LGBT+?',
        '¿En el último año personal del ayuntamiento ha recibido capacitación en temas sobre inclusión a la diversidad sexual?',
        '¿El municipio cuenta con algún reglamento que explícitamente garantiza derechos de las personas LGBT+?',
        '¿El municipio considera a la población LGBT+ dentro de su Plan Municipal de Desarrollo 2018 - 2021?',
        '¿Se han llevado a cabo encuentros, mesas de trabajo o cualquier otro mecanismo de participación ciudadana con colectivos, organizaciones de la sociedad civil o activistas que defienden derechos LGBT+?',
        '¿El municipio cuenta con una dependencia que dentro de su reglamento operativo tiene la explícita facultad u obligación de atender a la población LGBT+?',
        '¿El municipio cuenta con una dependencia que dentro de su reglamento operativo tiene la explícita facultad u obligación de diseñar políticas públicas para la inclusión de las personas LGBT+?',
        '¿Las reglas de operación de al menos un programa social reconocen a la población LGBT+ como un grupo prioritario?',
        '¿El municipio cuenta con un "Mecanismo municipal para atender y sancionar la discriminación" al que victimas de discriminación puedan acercarse para presentar una queja?',
        '¿Existe algún programa o componente presupuestal destinado a inclusión LGBT+?',
        '¿Como parte de algún trámite o procedimiento del ayuntamiento, se genera estadística desagregada por orientación sexual e identidad de género?',
        '¿Se identifican personas funcionarias públicas abiertamente LGBT+?',
        '¿En puestos directivos, regidurías, sindicatura o presidencia, hay perfiles abiertamente LGBT+?',
        'Índice de cumplimiento.',
    ];

    date = new FormControl();
    date_now_covid;
    minDate = new Date();
    maxDate = new Date();
    date_calendar = new Date();

    eventDatePicker: string;
    disableSelect = new FormControl(false);

    /////////////////////////////////////////////////////////////////////

    // graficas
    dataProperties;
    dataProperties7;
    dataProperties14;
    municipio = '';
    tot_cases_mun;
    tot_cases_mun_acum;
    date_covid;
    date_covid7;
    date_covid14;

    dateParamMap;
    cvegeo;
    // para defacumedades charbar2020
    pob_sex_hm_2020 = [];

    mensajeVegeta: string;

    parametro;
    layerNow;

    dataHombres;
    data1;
    data2;
    data3;
    urlToday: string;
    urlSeven: string;
    urlFourteen: string;
    urlParams1 = 'https://indices.jalisco.gob.mx/geoserver/covid19/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=activosxmpiograf&LAYERS=activosxmpiograf&STYLES=covid19%3Aactivosxmpio&VIEWPARAMS=aaaammdd:';
    urlParams2 = '&INFO_FORMAT=application%2Fjson&I=50&J=50&CRS=EPSG%3A3857&WIDTH=101&HEIGHT=101&BBOX=-11520273.173679635%2C2337414.386499927%2C-11495137.607241083%2C2362549.952938478';
    // viewparams = ['20200716', '20200715', '20200714'];
    dataAll = [];


    // filtrado del formGroup
    // viewParams = [];
    viewParams = '';
    vpStartDate = '';
    vpEndDate = '';
    vpStartTimeZone = '';
    vpEndTimeZone = '';
    vpTowns = '';
    vpSubcategory = '';
    vpWounds = '';
    vpAutoTypes = '';
    vpGenders = '';
    vpWeekDays = '';


    @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


    // ChartPie
    public barChartLabels: Label[] = ['125 Municipios'];
    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            xAxes: [{
                stacked: true,
                ticks: {
                    display: false,
                    // fontColor: 'rgba(255,255,255,0.1)',
                    // suggestedMax: 110,
                    // suggestedMin: -110
                },
                gridLines: {
                    display: false
                    // color: 'rgba(255,255,255,0.1)'
                },
                scaleLabel: {
                    display: true,
                    // labelString: 'Activos',
                },
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    // fontColor: 'rgba(255,255,255,0.1)',
                    display: false,
                },
                gridLines: { color: 'rgba(255,255,255,0.1)' },
                // scaleLabel: {
                // display: true,
                // labelString: 'Rango Edad',
                // },
            }]
        },
        plugins: {
            datalabels: {
                anchor: 'center',
                // align: '',
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    // console.log(value);

                    // return Math.abs(value);
                    return Math.abs(value);
                },
                color: 'white',
            }
        },
    };
    // public barChartLabels: Label[] = ['60 +', '48-59', '38-47', '28-37', '18-27', '0-17'];
    public barChartType: ChartType = 'horizontalBar';
    // public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];
    public barChartColors = [
        {
            backgroundColor: [lgtbColors.green]
        }, {
            backgroundColor: [lgtbColors.red]
        }, {
            backgroundColor: [lgtbColors.gray]
        },
    ];

    public barChartData: ChartDataSets[] = [
        {
            data: [50], label: 'Si',
        },
        {
            data: [50], label: 'No',
        },
        {
            data: [25], label: 'Todavía no contesta',
        },
    ];


    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'top',
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return label;
                },
            },
        }
    };
    public pieChartLabels: Label[] = ['SI', 'NO'];
    public pieChartData: number[] = [3, 2];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];
    public pieChartColors = [
        {
            backgroundColor: [
                lgtbColors.green, lgtbColors.red, lgtbColors.gray]
        },
    ];
    public options: any = {
        legend: { position: 'bottom' }
    };
    // pie

    name = 'CECYTEJ TOTATICHE EXTENSION COLOTLAN';
    cct = '14XTC0206Q';
    address = 'Reforma 83, del Cerrito, 46200';
    phone = '499 992 0562';
    careers: string[] = ['Componente Básico Inicial', 'Procesos de Gestión Administrativa', 'Soporte y Mantenimiento de Equipo de Cómputo', 'Sistemas'];

    myData: string;

    pos = 0;
    exit;




    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

        // switch(this.radioButton) {
        //     case 'mat-radio-3': {
        //         console.log('case mat-radio-3');
        //         this.casos = 3;
        //         break;
        //     }
        //     default: {
        //         console.log('Default - case mat-radio-2');
        //         this.casos = 2;
        //         break;
        //     }
        // }

        // console.log('event.target.value');
        // console.log(event.target.value);


        // this.eventDatePicker = (event.target.value.getFullYear().toString() + ', ' +
        // (event.target.value.getMonth() + 1).toString() + ', ' + event.target.value.getDate().toString())
        // this.routerUrl = this._router.url.split('/2')[0]
        // this.routerUrlCheck = this.eventDatePicker+'-'+this._router.url.split('-')[1]
        // console.log(this.routerUrl, this.routerUrlCheck + this.casos);
        // this._router.navigate([this.routerUrl, this.routerUrlCheck + this.casos]);
        // this._router.navigate([this.routerUrl, this.routerUrlCheck]);
    }
    addEvent2(type: string, event: MatDatepickerInputEvent<Date>) {

        console.log('event.target.value');
        console.log(event.target.value);
    }
    addEvent3(type: string, event: MatDatepickerInputEvent<Date>) {

        console.log('event.target.value');
        console.log(event.target.value);
    }
    addEvent4(type: string, event: MatDatepickerInputEvent<Date>) {

        console.log('event.target.value');
        console.log(event.target.value);
    }

    openBottomSheet(): void {
        this.pos = 0;
        this.viewParams = '';
        // console.log(new Date());


        this._bottomSheet.open(BottonSheetExampleComponent, { disableClose: true })
            .afterDismissed().subscribe((dataFilter) => {
                // this._dateService.getSinisterTown().subscribe(data => {
                //     console.log('data despues de filtrar');
                //     console.log(data.features);
                //     this.listarPaises = data.features;

                // });


                Object.values(dataFilter).forEach(value => {
                    if (value) {
                        switch (Object.getOwnPropertyNames(dataFilter)[this.pos]) {
                            case Object.getOwnPropertyNames(dataFilter)[0]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[0] + ':' + formatDate(dataFilter.startDate, 'yyyyMMdd', 'en-US') + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[1]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[1] + ':' + formatDate(dataFilter.endDate, 'yyyyMMdd', 'en-US') + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[2]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[2] + ':' + value + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[3]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[3] + ':' + value + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[4]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[4] + ':' + value.toString().substring(0, 6) + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[5]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[5] + ':' + value + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[6]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[6] + ':' + value + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[7]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[7] + ':' + value.toString().substring(0, 6) + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[8]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[8] + ':' + value + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[9]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[9] + ':' + value + ';';
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }
                    this.pos++;
                });

                // this.getSinisterIntersections(this.viewParams);
                // this.getSinisterSinistries(this.viewParams);
                // this.getSinisterWounds(this.viewParams);

                this.dataFilterDash = this.viewParams;

            });
    }

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private requestService: RequestService,
        private _dateService: DateService,
        private miDatePipe: DatePipe,
        private _bottomSheet: MatBottomSheet,
        private _spinnerService: SpinnerService) {

        this.avgAMG = 0.37;
        this.avgFlag = false;
        this.graficPie = true;

        this.chartIndiceHeight = 50;

        if (screen.width <= 1500 && screen.width > 1450) {
            this.chartIndiceHeight = 55;
        } else if (screen.width <= 1450 && screen.width > 1140) {
            this.chartIndiceHeight = 60;
        } else if (screen.width <= 1140 && screen.width > 800) {
            this.chartIndiceHeight = 65;
        } else if (screen.width <= 800 && screen.width > 600) {
            this.chartIndiceHeight = 45;
        } else if (screen.width <= 600 && screen.width > 450) {
            this.chartIndiceHeight = 50;
        } else if (screen.width <= 450 && screen.width > 50) {
            this.chartIndiceHeight = 80;
        }

        // console.log('screen.width:', screen.width);
        // this.openBottomSheet();


        // saca el total de intersections - cruces
        // this.getSinisterIntersections(this.viewParams);

        // saca el total de siniestros - sinistries
        // this.getSinisterSinistries(this.viewParams);


        // saca el total de intersections - cruces
        // this.getSinisterWounds(this.viewParams);
    }

    ngOnInit() {
        this.getResponseQuestionsAll();
        this._route.params.forEach(params => {
            // console.log(params.link);
            this.dataFilterDash = params.link;
            // console.log('this.dataFilterDash', this.dataFilterDash);

            switch (this.dataFilterDash) {
                case 'indice':
                    this.questionSelected = this.questions[13];
                    break;
                case 'p01':
                    this.questionSelected = this.questions[0];
                    break;
                case 'p02':
                    this.questionSelected = this.questions[1];
                    break;
                case 'p03':
                    this.questionSelected = this.questions[2];
                    break;
                case 'p04':
                    this.questionSelected = this.questions[3];
                    break;
                case 'p05':
                    this.questionSelected = this.questions[4];
                    break;
                case 'p06':
                    this.questionSelected = this.questions[5];
                    break;
                case 'p07':
                    this.questionSelected = this.questions[6];
                    break;
                case 'p08':
                    this.questionSelected = this.questions[7];
                    break;
                case 'p09':
                    this.questionSelected = this.questions[8];
                    break;
                case 'p10':
                    this.questionSelected = this.questions[9];
                    break;
                case 'p11':
                    this.questionSelected = this.questions[10];
                    break;
                case 'p12':
                    this.questionSelected = this.questions[11];
                    break;
                case 'p13':
                    this.questionSelected = this.questions[12];
                    break;
                default:
                    break;
            }

            this.getResponseQuestions(this.dataFilterDash);

            // const dataRequest = [];
            // dataRequest.push(this.dataFilterDash);
            // dataRequest.push(this.dataFilterDash - 10);
            // dataRequest.push(this.dataFilterDash - 10);


        });

    }

    getResponseQuestionsAll() {
        this.requestService.getResponseQuestionsAll().subscribe(data => {

            // console.log(data.features[0]);
            // console.log('data.features[0].properties', data.features[0].properties);
            this.loadRadarChartAll(data.features[0].properties);

        });
    }
    getResponseQuestions(viewParams) {
        // console.log('viewParams');
        // console.log(viewParams);

        // this.requestService.getResponseQuestions(viewParams).subscribe(data => {
        this.requestService.getResponseQuestions(viewParams).subscribe(data => {

            // console.log(data.features[0]);
            // console.log(data.features[0].properties);
            // console.log(Object.keys(data.features[0].properties).length);

            if (Object.keys(data.features[0].properties).length === 1) {

                this.avg = data.features[0].properties.avg;
                this.avgFlag = true;
                this.graficPie = false;

            } else {


                this.avgFlag = false;
                this.graficPie = true;

                this.responseYes = data.features[0].properties.response_yes;
                this.responseNo = data.features[0].properties.response_no;
                this.responseNotYet = data.features[0].properties.response_notyet;

                this.loadPieChart(this.responseYes, this.responseNo, this.responseNotYet);
            }

        });
    }

    getSinisterSinistries(viewParams) {
        // console.log('viewParams');
        // console.log(viewParams);

        this._dateService.getSinisterSinistries(viewParams).subscribe(data => {
            // console.log(data.features[0].properties.sinistries);
            this.sinistries = data.features[0].properties.sinistries;
        });
    }

    getSinisterWounds(viewParams) {
        this._dateService.getSinisterWounds(viewParams).subscribe(data => {
            // console.log(data.features[0].properties);
            this.wounds = data.features[0].properties.wounds;
        });
    }

    getSinisterIntersections(viewParams) {
        this._dateService.getSinisterIntersections(viewParams).subscribe(data => {
            // console.log(data.features[0].properties.intersections);
            this.intersections = data.features[0].properties.intersections;
        });
    }

    // este dato viene del hijo map.component
    getDataMap(params) {
        // console.log(params.indice);

        this.loadRadarChartMun(params);

        // let re = /Z/gi;
        // let str = params.date_now;
        // let date_covid = str.replace(re, '');

        // re = /-/gi;
        // str = date_covid;
        // date_covid = str.replace(re, ', ');

        // const date_now = new Date(date_covid);
        // const date_now7 = new Date(date_covid);
        // const date_now14 = new Date(date_covid);

        // date_now7.setDate(date_now.getDate() - 7);
        // date_now14.setDate(date_now.getDate() - 14);

        // this.date_covid = formatDate(date_now, 'yyyyMMdd', 'en-US');
        // this.date_covid7 = formatDate(date_now7, 'yyyyMMdd', 'en-US');
        // this.date_covid14 = formatDate(date_now14, 'yyyyMMdd', 'en-US');

        // this.cvegeo = params.cvegeo;
    }

    getDataMap2(layer) {
        this.layerNow = layer;
    }

    enviarMensaje(mensajeGoku) {
        this.requestService.enviar(mensajeGoku);
    }

    verMensaje() {
        this.requestService.bulma$.pipe(take(1)).
            subscribe(mensaje => this.mensajeVegeta = mensaje);
    }

    loadPieChart(responseYes, responseNo, responseNotYet) {
        this.pieChartLabels = ['SI ' + this.responseYes, 'NO ' + this.responseNo, 'TODAVÍA NO CONTESTA ' + this.responseNotYet];
        this.pieChartData = [responseYes, responseNo, responseNotYet];
        this.barChartData = [
            { data: [responseYes], label: 'Si' },
            { data: [responseNo], label: 'No' },
            { data: [responseNotYet], label: 'Todavía no contesta' }
        ];
    }

    loadRadarChartAll(response) {

        this.radarChartData = [
            {
                data: [response.p01, response.p02, response.p03, response.p04, response.p05,
                response.p06, response.p07, response.p08, response.p09, response.p10,
                response.p11, response.p12, response.p13], label: 'Jalisco'
            }
        ];
    }

    loadRadarChartMun(response) {

        this.indice = Number(response.indice).toFixed(2);
        this.municipio = response.nombre;

        this.graficRadar2 = true;

        this.radarChartDataMun = [
            {
                data: [response.p01, response.p02, response.p03, response.p04, response.p05,
                response.p06, response.p07, response.p08, response.p09, response.p10,
                response.p11, response.p12, response.p13], label: this.municipio
            }
        ];
    }

    loadCharts(dataProperties, dataProperties7, dataProperties14) {

        let date_covid_graf;
        let date_covid_graf7;
        let date_covid_graf14;

        let re = /Z/gi;
        let str = dataProperties.date_now;
        date_covid_graf = str.replace(re, '');

        re = /-/gi;
        str = date_covid_graf;
        date_covid_graf = str.replace(re, ', ');

        const date = new Date(date_covid_graf);
        const date7 = new Date(date_covid_graf);
        const date14 = new Date(date_covid_graf);

        date7.setDate(date14.getDate() - 7);
        date14.setDate(date14.getDate() - 14);

        date_covid_graf = formatDate(date, 'dd-MM-yyyy', 'en-US');
        date_covid_graf7 = formatDate(date7, 'dd-MM-yyyy', 'en-US');
        date_covid_graf14 = formatDate(date14, 'dd-MM-yyyy', 'en-US');


        this.pieChartData = [this.dataProperties.mujeres, dataProperties.hombres, dataProperties.ne];


    }

    // ng2 chartjs
    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        // console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        // console.log(event, active);
    }
    // ng2 chartjs

}

