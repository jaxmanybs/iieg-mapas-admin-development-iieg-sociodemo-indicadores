import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from './map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule} from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { Ng5SliderModule } from 'ng5-slider';
import { Chartbar2020Component } from './chartbar2020/chartbar2020.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RequestService } from '../services/request.service';
import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { MatListModule } from '@angular/material/list';

// services
import { DateService } from '../services/date.service';

import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../services/interceptor.service';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { NgApexchartsModule } from 'ng-apexcharts';

export function momentAdapterFactory() {
    return adapterFactory(moment);
}
@NgModule({
    imports: [
        LayoutModule,
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatDividerModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatExpansionModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        StatModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        ChartsModule,
        MatPaginatorModule,
        MatSliderModule,
        MatSortModule,
        MatFormFieldModule,
        Ng5SliderModule,
        MatSidenavModule,
        NgxSpinnerModule,
        NgApexchartsModule,

        // Material
        MatBottomSheetModule,
        MatButtonModule,
        MatListModule,
        FlexLayoutModule.withConfig({addFlexToParent: false}),
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory })
    ],
    declarations: [DashboardComponent, MapComponent, Chartbar2020Component],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }, DatePipe, RequestService, DateService]
})
export class DashboardModule {}
