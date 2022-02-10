import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogNotaMetodComponent } from './components/dialog-nota-metod/dialog-nota-metod.component';

import { MatRadioModule } from '@angular/material/radio';

import { BottonSheetExampleComponent } from './dashboard/botton-sheet-example/botton-sheet-example.component';
@NgModule({
    entryComponents: [DialogNotaMetodComponent, BottonSheetExampleComponent],
    imports: [
        CommonModule,
        FormsModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatTooltipModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatDatepickerModule,
        MatDialogModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    declarations: [
        LayoutComponent, TopnavComponent, SidebarComponent, DialogNotaMetodComponent,
        BottonSheetExampleComponent],
    exports: [SidebarComponent, LayoutComponent]
})
export class LayoutModule {  }
