import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

declare var gtag;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private _router: Router) {
        const navEndEvents$ = this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            );

        navEndEvents$.subscribe((event: NavigationEnd) => {
            gtag('config', 'UA-176781706-4', {  // ID Google Analytics
                'page_path': event.urlAfterRedirects
            });
        });
    }

    ngOnInit() {
    }
}
