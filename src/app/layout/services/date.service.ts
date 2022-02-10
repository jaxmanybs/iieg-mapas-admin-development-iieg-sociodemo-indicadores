import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

import { environment } from './../../../environments/environment';

@Injectable()
export class DateService {

    constructor(private http: HttpClient) {
    }
    // prueba de api para spinner
    baseUrl = environment.baseUrl;



    /// nosirve hasta ahorita
    private dataSubject = new Subject<any>();

    public getPeople() {
        return this.http.get(`${this.baseUrl}`);
    }

    getSinisterTown() {
        let url = 'http://10.25.6.213:8080/geoserver/iieg_it/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg_it%3Asinister_mun&outputFormat=application%2Fjson';
        const viewparams = 'mun';
        url += ('&VIEWPARAMS=field:' + viewparams);
        // console.log('town-service');
        // console.log(url);

        return this.http.get<any>(url);

        // var date = new Date();
        // var viewparams   = formatDate(date,'yyyyMMdd', 'en-US');

        // viewparams = ('&VIEWPARAMS=aaaammdd:' + viewparams);


        // var cvegeo = "&CQL_FILTER=cvegeo like '14039'"
        // var urlDate;

        // try{
        //     urlDate = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
        //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        //     + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&'
        //     + environment.outputJson + viewparams + cvegeo}`

        //     return this.http.get<any>(urlDate)
        // }catch{

        //     urlDate = `${environment.geoserverApi + '/' + environment.workspaceCovid  + '/ows?'
        //     + environment.wfsService + '&' + environment.version + '&' + environment.requestFeature + '&'
        //     + 'typeName=' + environment.workspaceCovid + ':' + environment.activosxmpiograf_7_14 +'&' + environment.outputJson + cvegeo}`

        //     console.log(urlDate);

        //     return this.http.get<any>(urlDate)
        // }
    }

    getSinisterAutoType() {
        let url = 'http://10.25.6.213:8080/geoserver/iieg_it/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg_it%3Asinister_mun&outputFormat=application%2Fjson';
        const viewparams = 'tipo_auto';
        url += ('&VIEWPARAMS=field:' + viewparams);
        // console.log('tipo_auto-service');
        // console.log(url);

        return this.http.get<any>(url);
    }

    getSinisterIntersections(viewParams) {
        let url = 'http://10.25.6.213:8080/geoserver/iieg_it/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg_it%3Asinister_intersections_tot&outputFormat=application%2Fjson';
        // console.log(viewParams);
        url += ('&VIEWPARAMS=' + viewParams);

        // console.log(url);


        return this.http.get<any>(url);
    }

    getSinisterSinistries(viewParams) {
        let url = 'http://10.25.6.213:8080/geoserver/iieg_it/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg_it%3Asinister_sinistries_tot&outputFormat=application%2Fjson';
        // console.log(viewParams);
        url += ('&VIEWPARAMS=' + viewParams);

        // console.log(url);


        return this.http.get<any>(url);
    }
    getSinisterWounds(viewParams) {
        let url = 'http://10.25.6.213:8080/geoserver/iieg_it/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg_it%3Asinister_wounds_tot&outputFormat=application%2Fjson';
        // console.log(viewParams);
        url += ('&VIEWPARAMS=' + viewParams);

        return this.http.get<any>(url);
    }

    getDataSubject(): Observable<any> {
        // console.log("service")
        return this.dataSubject.asObservable();
    }

    clearDataSubjet() {
        this.dataSubject.next();
    }

    setDataSubject(data) {
        console.log(data);
        this.dataSubject.next(data);
    }

}
