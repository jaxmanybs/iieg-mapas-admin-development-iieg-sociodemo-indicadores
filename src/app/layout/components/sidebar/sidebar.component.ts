import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { DialogNotaMetodComponent } from '../dialog-nota-metod/dialog-nota-metod.component';
import { toggleSidebar } from '../topnav/topnav.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']

})
export class SidebarComponent implements OnInit {
    selectedOptions: string[] = ['transparente'];

    constructor(
        public dialog: MatDialog,
        private _route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this._route.params.forEach(params => {
            // this.selectedOptions = [params.link];
            // console.log(params.link);

        });
    }
    toggleSidebar() { toggleSidebar(); }
    openDialog() {
        location.href = './assets/metodoLGBT.pdf';


        // this.dialog.open(DialogNotaMetodComponent);
    }

}
