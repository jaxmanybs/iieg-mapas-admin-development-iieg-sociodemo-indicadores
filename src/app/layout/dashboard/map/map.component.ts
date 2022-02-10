import { environment } from './../../../../environments/environment';
import { Component, OnInit, KeyValueDiffers, Output, Input, EventEmitter, OnChanges, SimpleChanges, LOCALE_ID } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { formatDate } from '@angular/common';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { RequestService } from '../../services/request.service';
import { take } from 'rxjs/operators';

import { DatePipe } from '@angular/common';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { defaults as defaultControls, FullScreen } from 'ol/control';
import 'ol/ol.css';
import { DragPan, MouseWheelZoom, defaults } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';

import 'rxjs/add/operator/map';
import { Logger } from '@syncfusion/ej2-angular-grids';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { equal } from 'assert';
import { equals } from 'ol/extent';
// import { url } from 'inspector';

declare var ol;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    providers: [{ provide: LOCALE_ID, useValue: 'en-GB' }],
})
export class MapComponent implements OnInit, OnChanges {


    // radio_buttons
    @Input() layer_case: string;

    public mensajeGoku: string;

    dateParam;
    parametro;
    layer_now;

    ////// COVID-19 ///////
    map: any;
    cvegeo;
    VIEW_PARAMS;
    STYLES;
    @Input() date_siderbar;
    date_now;
    date_7;
    date_14;
    @Output() desde_el_hijo = new EventEmitter();
    @Output() desde_el_hijo2 = new EventEmitter();
    @Output() desde_el_hijo_map = new EventEmitter();

    public date_now_covid_service;

    jsonMap: any;

    url_dateNow: any;
    date_Now_covid = new Date();

    panelOpenState = false;

    @Input()
    cveSubsector = 311;

    @Input()
    empleoyees = '';

    myLayers = [];
    view;
    overlay;
    // actualizar capa

    @Input() dataFilter: string;
    source;
    params;

    myStyles = [
        `${environment.workspaceIieg}:indicadores_mpios`,
        `${environment.workspaceIieg}:lgtb_p01_css`,
        `${environment.workspaceIieg}:lgtb_p02_css`,
        `${environment.workspaceIieg}:lgtb_p03_css`,
        `${environment.workspaceIieg}:lgtb_p04_css`,
        `${environment.workspaceIieg}:lgtb_p05_css`,
        `${environment.workspaceIieg}:lgtb_p06_css`,
        `${environment.workspaceIieg}:lgtb_p07_css`,
        `${environment.workspaceIieg}:lgtb_p08_css`,
        `${environment.workspaceIieg}:lgtb_p09_css`,
        `${environment.workspaceIieg}:lgtb_p10_css`,
        `${environment.workspaceIieg}:lgtb_p11_css`,
        `${environment.workspaceIieg}:lgtb_p12_css`,
        `${environment.workspaceIieg}:lgtb_p13_css`,
        `${environment.workspaceIieg}:lgtb_indice_css`,
        `${environment.workspaceIieg}:lgtb_indice_amgs_css`,
        `${environment.workspaceIieg}:indicador_pob_2020_css`,
    ];
    geoserverLayers = [
        'iieg:indicador_pob_2020',
        'siniestros',
        'iieg:inmuebles_municipios_jalisco',
    ];

    osmLayer: any;
    sinister: any;
    indicador_pob: any;
    municipios: any;
    defuncionesxmpio: any;

    urlLgtb = `${environment.geoserverApi + '/' + environment.workspaceIieg + '/wms?'}`;
    urlIieg = `${environment.geoserverApi + '/' + environment.workspaceIieg + '/wms?'}`;
    // urlGraphics = `${environment.geoserverApi + '/' + environment.workspaceCovid + '/wms?' }`
    owsGraphics = `${environment.wfsService + '&' +
        environment.version + '&' +
        environment.requestFeature + '&' +
        environment.typeNameFechas + '&' +
        environment.maxFeatures + '&' +
        environment.outputJson}`;
    owsDate = `${environment.wfsService + '&' +
        environment.version + '&' +
        environment.requestFeature + '&' +
        environment.typeNameFechas + '&' +
        environment.maxFeatures + '&' +
        environment.outputJson}`;

    //  END COVID-19
    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    };
    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];
    public barChartColors = [
        {
            backgroundColor: ['#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C'],
        },
        {
            backgroundColor: ['#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF'],
        }
    ];

    public barChartData: ChartDataSets[] = [];

    mensaje = 'Map!';
    myData = false;

    layer;

    firtsChange = false;

    show = true;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _requestService: RequestService,
        private miDatePipe: DatePipe
    ) { }

    ngOnChanges(changes: SimpleChanges): void {

        // console.log('OnChanges--this.dataFilter');
        // console.log(this.dataFilter);
        // console.log('ngOnChanges');

        // if (this.firtsChange) {
        //     switch (this.dataFilter) {
        //         case 'p01':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[16] });
        //             break;
        //         case 'p02':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[2] });
        //             break;
        //         case 'p03':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[3] });
        //             break;
        //         case 'p04':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[4] });
        //             break;
        //         case 'p05':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[5] });
        //             break;
        //         case 'p06':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[6] });
        //             break;
        //         case 'p07':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[7] });
        //             break;
        //         case 'p08':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[8] });
        //             break;
        //         case 'p09':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[9] });
        //             break;
        //         case 'p10':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[10] });
        //             break;
        //         case 'p11':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[11] });
        //             break;
        //         case 'p12':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[12] });
        //             break;
        //         case 'p13':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[13] });
        //             break;
        //         case 'indice':
        //             this.municipios.getSource().updateParams({ STYLES: this.myStyles[14] });
        //             break;
        //         default:
        //             break;
        //     }


        // } else {
        //     this.firtsChange = true;

        // }

        // const styles = this.municipios.getSource();
        // this.VIEW_PARAMS = this.dataFilter;
        // this.STYLES = this.dataFilter;

        // console.log('styles before filter');
        // console.log(styles);

        // styles.STYLES = this.STYLES;

        // console.log('viewparams after filter');
        // console.log(viewparams);


        // this.municipios.getSource().updateParams(viewparams);

    }

    ngOnInit(): void {

        this.createLayers();
        this.createMap();
        // this._route.params.forEach(params =>{

        //     this.layer = this._router.url.split('-')[1];
        //     var date_covid = new Date(params.date.split('-')[0]);
        //     this.parametro = params.date.split('-')[0]
        //     this.dateParam   = formatDate(date_covid,'yyyyMMdd', 'en-US');

        // const viewparams = this.sinister.getSource().getParams();

        // this.VIEW_PARAMS = this.dateParam;
        // viewparams.VIEWPARAMS = this.VIEW_PARAMS;
        // this.activosxmpio.getSource().updateParams(viewparams);

        // console.log('---hola');


        //     switch(this.layer) {
        //         case 'act3': {
        //             this.municipios.setZIndex(1)
        //             // this.activosxmpio.getSource().updateParams({STYLES: this.myStyles[5]});
        //             this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[5], STYLES: this.myStyles[5]});
        //             var view = new View({
        //                 center: ol.proj.fromLonLat([-103.4564,20.664]),
        //                 zoom: 7.8
        //             });
        //             // this.map.setView(view)
        //             this.desde_el_hijo_map.emit('act');
        //             this.layer_now = 'Tasa';
        //             break;
        //         }
        //         case 'act2': {
        //             this.municipios.setZIndex(1)
        //             this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[0], STYLES: this.myStyles[0]});
        //             var view = new View({
        //                 center: ol.proj.fromLonLat([-103.4564,20.664]),
        //                 zoom: 7.8
        //             });
        //             // this.map.setView(view)
        //             this.desde_el_hijo_map.emit('act');
        //             this.layer_now = 'Activos';
        //             break;
        //         }
        //         case 'acu': {
        //             this.municipios.setZIndex(1)
        //             this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[1], STYLES:this.myStyles[0]});
        //             var view = new View({
        //                 center: ol.proj.fromLonLat([-103.4564,20.664]),
        //                 zoom: 7.8
        //             });
        //             // this.map.setView(view)
        //             this.desde_el_hijo_map.emit('acu');
        //             this.layer_now = 'Acumulados';
        //             break;
        //         }
        //         case 'def': {
        //             this.municipios.setZIndex(1)
        //             this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[2], STYLES:this.myStyles[2]});
        //             var view = new View({
        //                 center: ol.proj.fromLonLat([-103.4564,20.664]),
        //                 zoom: 7.8
        //             });
        //             // this.map.setView(view)
        //             this.desde_el_hijo_map.emit('def');
        //             this.layer_now = 'Defunciones';
        //             break;
        //         }
        //         case 'nac': {
        //             this.municipios.setZIndex(0)
        //             this.osmLayer.setZIndex(1)
        //             this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[3], STYLES:this.myStyles[3]});
        //             var view = new View({
        //                 center: ol.proj.fromLonLat([-103.0564,22.964]),
        //                 zoom: 5
        //             });
        //             this.map.setView(view)
        //             this.desde_el_hijo_map.emit('nac');
        //             this.layer_now = 'Nacional';
        //             break;
        //         }
        //         default: {
        //             this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[0], STYLES: this.myStyles[0]});
        //             var view = new View({
        //                 center: ol.proj.fromLonLat([-103.4564,20.664]),
        //                 zoom: 7.8
        //             });
        //             // this.map.setView(view)
        //             this.desde_el_hijo_map.emit('act');
        //             this.layer_now = 'Activos';
        //             break;
        //         }
        //     }
        // })
    }

    // init() {
    //     this.createLayers();
    //     this.createMap();
    //     console.log(this.urlIieg);

    // }

    // resetChildForm() {

    //     this.show = false;

    //     setTimeout(() => {
    //         this.show = true;
    //         this.createMap();
    //     }, 100);
    // }

    enviarMensaje(mensajeVegeta) {
        this._requestService.enviar(mensajeVegeta);
    }

    verMensaje() {
        // take es un operador que hará que solo obtengamos el último valor
        // que tiene bulma$ almacenado. Si no lo usamos, cuando enviemos un mensaje
        // de cualquiera de los dos componentes, se mostrará automaticamente
        // en el que ya haya visto un mensaje anteriormente.
        this._requestService.bulma$.pipe(take(1))
            .subscribe(mensaje => this.mensajeGoku = mensaje);
    }

    updateData(value: boolean) {
        // this._requestService.updateData(value);
    }

    createLayers() {
        this.osmLayer = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'type': 'base',
            'opacity': 1.000000,
            source: new ol.source.XYZ({
                url: 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
            })
        });

        this.sinister = new ol.layer.Image({
            title: 'sinister',
            visible: true,
            source: new ol.source.ImageWMS({
                // url: this.urlIieg,
                // url: 'http://10.25.6.213:8080/geoserver/iieg_it/wms?',
                url: 'https://indices.jalisco.gob.mx/geoserver/iieg/wms?',
                params: {
                    LAYERS: 'iieg:mpios2012_lgtb',
                    STYLES: this.myStyles[0]
                },
                serverType: 'geoserver'
            })
        });
        this.sinister.setZIndex(2);


        this.indicador_pob = new ol.layer.Image({
            visible: true,
            source: new ol.source.ImageWMS({
                url: 'https://indices.jalisco.gob.mx/geoserver/iieg/wms?',
                params: {
                    LAYERS: 'iieg:indicador_pob',
                    STYLES: this.myStyles[16]
                },
                serverType: 'geoserver'
            })
        });
        this.indicador_pob.setZIndex(2);


        this.municipios = new ol.layer.Image({
            visible: true,
            source: new ol.source.ImageWMS({
                url: 'https://indices.jalisco.gob.mx/geoserver/iieg/wms?',
                // url: this.urlLgtb,
                params: {
                    // LAYERS: this.geoserverLayers[4],
                    // STYLES: this.myStyles[4]
                    LAYERS: 'iieg:mpios_lgtb',
                    STYLES: this.myStyles[1]
                },
                serverType: 'geoserver'
            })
        });
        this.municipios.setZIndex(3);

        this.view = new View({
            center: ol.proj.fromLonLat([-103.7964, 20.804]),
            zoom: 6.6
            // zoom: 7.3
        });
    }

    createMap() {

        // don´t move mobile
        if (screen.width <= 800) {
            console.log('si jalo');

            this.map = new Map({
                interactions: defaults({ dragPan: false, mouseWheelZoom: false }).extend([
                    new DragPan({
                        condition: function (event) {
                            return this.getPointerCount() === 2 || platformModifierKeyOnly(event);
                        },
                    }),
                    new MouseWheelZoom({
                        condition: platformModifierKeyOnly,
                    })]),
                controls: defaultControls().extend([
                    new FullScreen({
                        source: 'fullscreen'
                    })
                ]),
                layers: [
                    this.osmLayer,
                    // this.sinister,
                    this.municipios,
                    this.indicador_pob,
                ],
                target: document.getElementById('map')
            });
        } else {
            this.map = new Map({
                layers: [
                    this.osmLayer,
                    // this.sinister,
                    this.indicador_pob,
                    // this.municipios,
                ],
                target: document.getElementById('map')
            });
        }

        //  mobile move
        // this.map = new Map({
        //     controls: defaultControls().extend([
        //         new FullScreen({
        //             source: 'fullscreen'
        //         })
        //     ]),
        //     layers: [
        //         this.osmLayer,
        //         this.sinister,
        //         this.municipios,
        //     ],
        //     target: document.getElementById('map')
        // });






        this.map.setView(this.view);
        this.map.addControl(new ol.control.ZoomSlider());

        this.source = this.sinister.getSource();
        this.params = this.source.getParams();

        this.map.on('singleclick', (event) => {

            // console.log('click on map');
            this.callback(event);
        });
    }

    // updateMap(viewparam) {

    // const viewparams = this.sinister.getSource().getParams();
    //     this.VIEW_PARAMS = 'aaaammdd:' + viewparam;

    //     viewparams.VIEWPARAMS = this.VIEW_PARAMS;
    //     this.sinister.getSource().updateParams(viewparams);
    // }

    callback(evt) {

        const viewResolution = /** @type {number} */ (this.view.getResolution());
        const urlMunicipios = this.municipios.getSource().getFeatureInfoUrl(
            evt.coordinate, viewResolution, 'EPSG:3857',
            { 'INFO_FORMAT': 'application/json' });

        // console.log(urlMunicipios);


        fetch(urlMunicipios).then(data => {

            return data.json();
        }).then(json => {
            // console.log(json);

            try {

                //     json.features[0].properties['layers'] = this.sinister.getSource().getParams().LAYERS;
                //     json.features[0].properties['viewparams'] = this.sinister.getSource().getParams().VIEWPARAMS;

                // this._requestService.updateCvegeo(json.features[0].properties.cvegeo);
                // this._requestService.updateLayers(json.features[0].properties.layers);

                // console.log(json.features[0].properties);
                this.desde_el_hijo.emit(json.features[0].properties);
                //     this.date_now_covid_service = json.features[0].properties.date_now;

            } catch (error) {
                // console.log('error', error);
            }

            return null;
        });
    }

    // getDateNow() {
    //     this.url_dateNow = this.urlDate + this.owsDate;
    //     fetch(this.url_dateNow ).then(data => {
    //     return data.json();
    //     }).then(json => {
    //         try {
    //             let re = /Z/gi;
    //             let str = json.features[0].properties.date_now;
    //             this.date_Now_covid = str.replace(re, '');

    //             re = /-/gi;
    //             str = this.date_Now_covid;
    //             this.date_Now_covid = str.replace(re, '');

    //         } catch (error) {}

    //         return null;
    //     });
    // }

}
// , iieg_sitios.lgtb_questions.p02, iieg_sitios.lgtb_questions.p03, iieg_sitios.lgtb_questions.p04, iieg_sitios.lgtb_questions.p05, iieg_sitios.lgtb_questions.p06, iieg_sitios.lgtb_questions.p07, iieg_sitios.lgtb_questions.p08, iieg_sitios.lgtb_questions.p09, iieg_sitios.lgtb_questions.p10, iieg_sitios.lgtb_questions.p11, iieg_sitios.lgtb_questions.p12, iieg_sitios.lgtb_questions.p13, iieg_sitios.lgtb_questions.indice

// iieg_sitios.mpios2012_lgtb.geom, iieg_sitios.mpios2012_lgtb.gid, iieg_sitios.mpios2012_lgtb.nombre, iieg_sitios.mpios2012_lgtb.cvegeo, iieg_sitios.mpios2012_lgtb.region, iieg_sitios.mpios2012_lgtb.areakm2, iieg_sitios.mpios2012_lgtb.cve, iieg_sitios.mpios2012_lgtb.id_jal, iieg_sitios.mpios2012_lgtb.colinoe, iieg_sitios.mpios2012_lgtb.litoral,
