import { EventEmitter, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RequestService {

    constructor(
        private http: HttpClient
    ) {
        //   this.datePipeString = formatDate(Date.now(),'yyyyMMdd', 'en-US');
        // console.log('this.datePipeString');
        // console.log(this.datePipeString);
    }
    private bulma = new BehaviorSubject<string>('');

    // No se utiliza directamente el BehaviorSubject (buena practica)
    // Se canaliza su uso a través de un observable que será público.
    // Este observable llamará quién quiera ver el último mensaje que se dejó.
    bulma$ = this.bulma.asObservable();

    public date_now_covid_service;

    nombre$ = new EventEmitter<string>();

    onGetData = new EventEmitter<string>();

    private dataObs$ = new Subject();

    datePipeString: string;

    // petiiones mediante CQL_FILTER¿
    // 14039 cvegeo GDL
    // http://10.13.23.32:8080/geoserver/covid19 / ows?
    // service=WFS&version=1.0.0&request=GetFeature&typeName=covid19:
    // defacumedades&outputFormat=application/json&CQL_FILTER=cvegeo like '14039'
    cvegeo = '14039';
    cqlFilter = `&CQL_FILTER=cvegeo like '+${this.cvegeo}'`;

    mpioSelected;
    layer = environment.activosxmpiograf;
    viewparams;
    viewparams7;
    viewparams14;
    dateNowService;
    dateNowServiceRes;

    date_now_def;

    // Almacenar mensaje, listo para mostrarlo a quién lo pida.
    enviar(mensaje) {
        // function que llamará quien quiera transmitir un mensaje.
        this.bulma.next(mensaje);
    }

    getResponseQuestions(questionId) {
        // const questionid = questionId;

        let urlQuestions;
        const viewparams = '&VIEWPARAMS=question:' + questionId;

        let questionApi = 'lgtb_questions_api';
        if (questionId === 'indice') {
            questionApi = 'lgtb_questions_indice_api';
        }


        urlQuestions = `${environment.geoserverApi + '/' + environment.workspaceIieg + '/ows?'
            + 'service=WFS&version=1.0.0&request=GetFeature&typeName=iieg:' + questionApi + '&outputFormat=application/json'
            + viewparams}`;

        // console.log(questionId);
        // console.log(viewparams);
        // console.log(urlQuestions);


        // /////////////// ejemplo observable
        // const gh = ajax.getJSON('https://api.github.com/users/jaxmanybs');

        // const data$ = new Observable(observer => {
        //     gh.subscribe(
        //         (res) => {
        //             observer.next(res);
        //             observer.complete();
        //         },
        //         (err => {
        //             observer.error(err);
        //         })
        //     );
        // });

        // // data$.subscribe((data) => {

        // //     console.log(data);
        // // });

        // data$.pipe(
        //     // mergeMap((res: any) => ajax(res.blog)),
        // ).subscribe(final => {
        //     console.log(final);
        //     // console.log(final.status);

        // });


        // forkJoin(data$, data$, data$).subscribe(res => {

        //     res.map((res2: any) => {

        //         console.log(res2.features[0].properties);
        //     });

        // });

        return this.http.get<any>(urlQuestions);
    }

    getResponseQuestionsAll() {

        let urlQuestionsAll;

        urlQuestionsAll = `${environment.geoserverApi + '/' + environment.workspaceIieg + '/ows?'
            + 'service=WFS&version=1.0.0&request=GetFeature&typeName=iieg:lgtb_questions_all_api&outputFormat=application/json'}`;

        // console.log(urlQuestionsAll);

        return this.http.get<any>(urlQuestionsAll);
    }
    // getDate() {

    //     const date = new Date();
    //     let viewparams   = formatDate(date, 'yyyyMMdd', 'en-US');

    //     viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);


    //     const cvegeo = '&CQL_FILTER=p02 = "1"';
    //     let urlDate;

    //     try {
    //         urlDate = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //         + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //         + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 + '&' + environment.outputJson + viewparams + cvegeo}`;

    //         return this.http.get<any>(urlDate);
    //     } catch {

    //         urlDate = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //         + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //         + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 + '&' + environment.outputJson + cvegeo}`;

    //         return this.http.get<any>(urlDate);
    //     }
    // }
    // getDateNow() {

    //     const date2 = new Date();
    //     date2.setDate(date2.getDate() - 1);

    //     let viewparams2   = formatDate(date2, 'yyyyMMdd', 'en-US');
    //     viewparams2 = ('&VIEWPARAMS=aaaammdd:' + viewparams2);

    //     const cvegeo = '&CQL_FILTER=cvegeo like \'14039\'';

    //     const urlDate = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //     + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 + '&' + environment.outputJson + viewparams2 + cvegeo}`;

    //     return this.http.get<any>(urlDate);
    // }
    // getActives(viewparams, cvegeo) {

    //     viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);
    //     const cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);

    //     const urlActives = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //     + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 + '&' + environment.outputJson + viewparams + cqlfilter}`;

    //     return this.http.get<any>(urlActives);
    // }
    // getActives7(viewparams7, cvegeo) {

    //     viewparams7 = ('&VIEWPARAMS=aaaammdd:' + viewparams7);
    //     const cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);

    //     const urlActives7 = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //     + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 + '&' + environment.outputJson + viewparams7 + cqlfilter}`;

    //     return this.http.get<any>(urlActives7);
    // }
    // getActives14(viewparams14, cvegeo) {

    //     viewparams14 = ('&VIEWPARAMS=aaaammdd:' + viewparams14);
    //     const cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);

    //     const urlActives14 = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //     + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 + '&' + environment.outputJson + viewparams14 + cqlfilter}`;

    //     return this.http.get<any>(urlActives14);
    // }
    // getAcumMun_7_14(layers, viewparams2, cvegeo) {

    //     layers += '_7_14';


    //     const cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
    //     viewparams2 = ('&VIEWPARAMS=aaaammdd:' + viewparams2);

    //     const getAcumMun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //     + 'typeName=' + environment.workspaceCovid + ':' + layers + '&' + environment.outputJson + viewparams2 + cqlfilter}`;

    //     return this.http.get<any>(getAcumMun);
    // }
    // getAcumMun_7_14_nac(layers, viewparams2, cvegeo) {

    //     layers += '_7_14';

    //     const cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
    //     viewparams2 = ('&VIEWPARAMS=' + viewparams2);

    //     const getAcumMun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //     + 'typeName=' + environment.workspaceCovid + ':' + layers + '&' + environment.outputJson + viewparams2 + cqlfilter}`;

    //     return this.http.get<any>(getAcumMun);
    // }
    // getDefMun_7_14(layers, viewparams2, cvegeo) {

    //     layers += '_7_14';
    //     const cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
    //     viewparams2 = ('&VIEWPARAMS=aaaammdd:' + viewparams2);

    //     const getAcumMun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //     + 'typeName=' + environment.workspaceCovid + ':' + layers + '&' + environment.outputJson + viewparams2 + cqlfilter}`;

    //     return this.http.get<any>(getAcumMun);
    // }
    // getActivesMun(layers, viewparams2, cvegeo) {

    //     layers += '_7_14';
    //     const cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
    //     viewparams2 = ('&VIEWPARAMS=' + viewparams2);

    //     const getActivesMun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //     + 'typeName=' + environment.workspaceCovid + ':' + layers + '&' + environment.outputJson + viewparams2 + cqlfilter}`;

    //     // console.log(getActivesMun);

    //     return this.http.get<any>(getActivesMun);
    // }
    // getActives7Mun(layers, viewparams, cvegeo) {

    //     layers += '_7_14';
    //     const cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
    //     viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);

    //     const getActives7Mun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //     + 'typeName=' + environment.workspaceCovid + ':' + layers + '&' + environment.outputJson + viewparams + cqlfilter}`;

    //     // console.log(getActives7Mun);

    //     return this.http.get<any>(getActives7Mun);
    // }
    // getActives14Mun(layers, viewparams, cvegeo) {

    //     layers += '_7_14';
    //     const cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
    //     viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);

    //     const getActives14Mun = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //     + 'typeName=' + environment.workspaceCovid + ':' + layers + '&' + environment.outputJson + viewparams + cqlfilter}`;

    //     // console.log(getActives14Mun);

    //     return this.http.get<any>(getActives14Mun);
    // }
    // getCvegeo() {
    //     return this.cvegeo;
    // }
    // updateCvegeo(cvegeo) {
    //     this.cvegeo = cvegeo;
    // }
    // getLayers() {
    //     return this.layer;
    // }
    // updateLayers(layer) {
    //     this.layer = layer;
    // }
    // acumEdades1(layer, viewparams, cvegeo) {

    //     let cqlfilter;

    //     if (cvegeo === undefined) {
    //         cqlfilter = '&CQL_FILTER=cvegeo like \'14039\'';
    //     } else {
    //         cqlfilter = (`&CQL_FILTER=cvegeo like '${cvegeo}'`);
    //     }

    //     switch (layer) {
    //         case 'act' || 'act3': {
    //             layer = 'activosacumedades';
    //             break;
    //           }
    //         case 'acu': {
    //             layer = 'postivosacumedades';
    //             break;
    //         }
    //         case 'def': {
    //             layer = 'defacumedades';
    //             break;
    //         }
    //         case 'nac': {
    //             layer = 'defacumedadesnac';
    //             break;
    //         }
    //         default: {
    //             // layer = 'defuncionesnacional'
    //             break;
    //         }

    //     }

    //     viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);

    //     const urlAcumEdades1 = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //     + 'typeName=' + environment.workspaceCovid + ':' + layer + '&' + environment.outputJson + viewparams + cqlfilter}`;

    //     return this.http.get<any>(urlAcumEdades1);
    // }
    // acumEdades(viewparams) {

    //     viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);
    //     const cqlfilter = (`&CQL_FILTER=cvegeo like '${this.cvegeo}'`);

    //     const urlAcumEdades = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
    //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
    //     + 'typeName=' + environment.workspaceCovid + ':' + environment.activosacumedades + '&' + environment.outputJson + viewparams + cqlfilter}`;

    //     return this.http.get<any>(urlAcumEdades);

    // }
    // ///////////////// no se utiliza hasta ahorita /////////////////////////////////////////////////////////////////////////////////
    // getData() {
    //     return this.dataObs$;
    // }
    // updateData(data: boolean) {
    //     this.dataObs$.next(data);
    // }
}
