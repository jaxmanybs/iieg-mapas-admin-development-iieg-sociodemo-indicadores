import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { DateService } from './../../services/date.service';

interface StartTimeZone {
    value: string;
    name: string;
}

interface EndTimeZone {
    value: string;
    name: string;
}

interface Town {
    value: string;
    name: string;
}

interface Subcategory {
    value: string;
    name: string;
}

interface Wound {
    value: string;
    name: string;
}

interface AutoType {
    value: string;
    name: string;
}

interface Gender {
    value: string;
    name: string;
}

interface WeekDay {
    value: string;
    name: string;
}

@Component({
  selector: 'app-botton-sheet-example',
  templateUrl: './botton-sheet-example.component.html',
  styleUrls: ['./botton-sheet-example.component.scss']
})
export class BottonSheetExampleComponent implements OnInit {


    // filtrado

    minValue;
    maxValue;

    externalData = [];
    minDateFilter = new Date(2019, 0, 1);
    maxDateFilter = new Date(2019, 5, 30);
    // minDateStart = new Date(2019, 0, 1);
    // maxDateEnd = new Date(2019, 5, 30);
    // minHorary1 = new Date(2019, 7, 31);
    // maxHorary1 = new Date(2019, 6, 30);
    // minHorary2 = new Date(2019, 7, 31);
    // maxHorary2 = new Date(2019, 6, 30);

    @Output() desde_el_hijo_botton_sheet = new EventEmitter();

    formGroup: FormGroup = new FormGroup({
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        startTimeZones: new FormControl(''),
        endTimeZones: new FormControl(''),
        towns: new FormControl(''),
        subcategories: new FormControl(''),
        wounds: new FormControl(''),
        autoTypes: new FormControl(''),
        genders: new FormControl(''),
        weekDays: new FormControl('')

        // startDate: new FormControl('',  Validators.required),
        // endDate: new FormControl('',  Validators.required),
        // startTimeZones: new FormControl('',  Validators.required),
        // endTimeZones: new FormControl('',  Validators.required),
        // towns: new FormControl('',  Validators.required),
        // involveds: new FormControl('',  Validators.required),
        // wounds: new FormControl('',  Validators.required),
        // autoTypes: new FormControl('',  Validators.required),
        // genders: new FormControl('',  Validators.required),
        // weekDays: new FormControl('',  Validators.required)
    });

    allViewParams = [];


    startTimeZones: StartTimeZone[] = [
        {value: '', name: 'Todos'},
        {value: '0', name: '00:00 A 02:00'},
        {value: '2', name: '02:00 A 04:00'},
        {value: '4', name: '04:00 A 06:00'},
        {value: '6', name: '06:00 A 08:00'},
        {value: '8', name: '08:00 A 10:00'},
        {value: '10', name: '10:00 A 12:00'},
        {value: '12', name: '12:00 A 14:00'},
        {value: '14', name: '14:00 A 16:00'},
        {value: '16', name: '16:00 A 18:00'},
        {value: '18', name: '18:00 A 20:00'},
        {value: '20', name: '20:00 A 22:00'},
        {value: '22', name: '22:00 A 24:00'},
        {value: '26', name: 'N.D.'},
    ];

    endTimeZones: EndTimeZone[] = [
        {value: '', name: 'Todos'},
        {value: '0', name: '00:00 A 02:00'},
        {value: '2', name: '02:00 A 04:00'},
        {value: '4', name: '04:00 A 06:00'},
        {value: '6', name: '06:00 A 08:00'},
        {value: '8', name: '08:00 A 10:00'},
        {value: '10', name: '10:00 A 12:00'},
        {value: '12', name: '12:00 A 14:00'},
        {value: '14', name: '14:00 A 16:00'},
        {value: '16', name: '16:00 A 18:00'},
        {value: '18', name: '18:00 A 20:00'},
        {value: '20', name: '20:00 A 22:00'},
        {value: '22', name: '22:00 A 24:00'},
        {value: '26', name: 'N.D.'},
    ];

    towns: Town[] = [
        {value: '', name: 'Todos'}
    ];

    subcategories: Subcategory[] = [
        {value: '', name: 'Todos'},
        {value: 'Cic', name: 'Ciclista'},
        {value: 'Con', name: 'Conductor otro vehículo'},
        {value: 'Mot', name: 'Motociclista'},
        {value: 'Pas', name: 'Pasajero otro vehículo'},
        {value: 'Pea', name: 'Peaton'}
    ];

    wounds: Wound[] = [
        {value: '', name: 'Todos'},
        {value: 'Her', name: 'Herido'},
        {value: 'Mue', name: 'Muerto'}
    ];

    autoTypes: AutoType[] = [
        {value: '', name: 'Todos'}
    ];

    genders: Gender[] = [
        {value: '', name: 'Todos'},
        {value: 'fem', name: 'Femenino'},
        {value: 'mas', name: 'Masculino'},
        {value: 'N', name: 'N.D.'}
    ];

    weekDays: WeekDay[] = [
        {value: '', name: 'Todos'},
        {value: 'lun', name: 'Lunes'},
        {value: 'mar', name: 'Martes'},
        {value: 'mie', name: 'Miércoles'},
        {value: 'jue', name: 'Jueves'},
        {value: 'vie', name: 'Viernes'},
        {value: 'sab', name: 'Sábado'},
        {value: 'dom', name: 'Domingo'}
    ];

    employee = 'all';
    cveSubsector = 311;
   // minValue
   // maxValue
   // options: Options = {
   //     floor: 0,
   //     ceil: 100,
   //     translate: (value: number, label: LabelType): string => {
   //     switch (label) {
   //         case LabelType.Low:
   //         return '<small>' + value + '</small>';
   //         case LabelType.High:
   //         return '<small>' + value + '</small>';
   //         default:
   //         return '<small>' + value + '</small>' ;
   //     }
   //     }
   // };

   date = new FormControl();
   date_now_covid;
//    minDate = new Date(2020, 3, 26);
//    maxDate = new Date();
   date_calendar = new Date();


   eventDatePicker: string;
   // DatePickerRange
   // range = new FormGroup({
   //     start: new FormControl(),
   //     end: new FormControl()
   // });
   // Selects
   disableSelect = new FormControl(false);

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

    //    console.log('event.target.value');
    //    console.log(event.target.value);


       // this.eventDatePicker = (event.target.value.getFullYear().toString() + ', ' + (event.target.value.getMonth() + 1).toString()
       //    + ', ' + event.target.value.getDate().toString())
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
    constructor(
        private dateService: DateService,
        private bottomSheetRef: MatBottomSheetRef<BottonSheetExampleComponent>,
        ) {

        // this.formGroup.value.start_end = new FormControl(this.minDate1);
        // this.date = new FormControl(this.minDate1);

        this.dateService.getSinisterTown().subscribe(data => {
            data.features.forEach(feature => {
                // feature.properties['isDisable'] = true
                // if(feature.properties.iceValue >= this.formGroup.value.sliderControl[0]
                // && feature.properties.iceValue <= this.formGroup.value.sliderControl[1]){
                //   feature.properties['isDisable'] = false
                // }
                this.towns.push({value: feature.properties.name, name: feature.properties.name});
                // console.log(feature.properties);
                // console.log(feature);

            });

            // console.log("this.towns");
            // console.log(this.towns);



            // this.minValue = this.formGroup.value.sliderControl[0]
            // this.maxValue = this.formGroup.value.sliderControl[1]
            // data.features.forEach(feature => {
            //     feature.properties['isDisable'] = true
            //     if(feature.properties.iceValue >= this.formGroup.value.sliderControl[0]
            //     && feature.properties.iceValue <= this.formGroup.value.sliderControl[1]){
            //         feature.properties['isDisable'] = false
            //     }
            //     this.listSubsectors.push(feature.properties)

            // })
            // this.formGroup.patchValue({
            //     towns: this.towns[0].value,
            //     involveds: this.involveds[0].value,
            //     wounds: this.wounds[0].value,
            //     auto_type: this.auto_types[0].value,
            //     genders: this.genders[0].value,
            //     week_days: this.week_days[0].value
            // })
            this.onSubmit();
        });
        this.dateService.getSinisterAutoType().subscribe(data => {
            data.features.forEach(feature => {
                // feature.properties['isDisable'] = true
                // if(feature.properties.iceValue >= this.formGroup.value.sliderControl[0]
                // && feature.properties.iceValue <= this.formGroup.value.sliderControl[1]){
                //   feature.properties['isDisable'] = false
                // }
                this.autoTypes.push({value: feature.properties.name, name: feature.properties.name});
            });
            this.formGroup.patchValue({
                startDate: this.minDateFilter,
                endDate: this.maxDateFilter,
                startTimeZones: this.startTimeZones[0].value,
                endTimeZones: this.endTimeZones[0].value,
                towns: this.towns[0].value,
                subcategories: this.subcategories[0].value,
                wounds: this.wounds[0].value,
                autoTypes: this.autoTypes[0].value,
                genders: this.genders[0].value,
                weekDays: this.weekDays[0].value
            });
        });

        // this.formGroup.controls['sliderControl'].valueChanges.subscribe(value => {
        //     this.minValue = value[0]
        //     this.maxValue = value[1]
        //     this.updateSubsectorSelect()
        // })
    }

    // confirmDelete(event: MouseEvent): void {
    //     this.bottomSheetRef.dismiss('Deleted');
    //     event.preventDefault();
    // }

    // aplica el filtrado hacia eldashboard
    sendDataFilter(event: MouseEvent): void {
        const dataFiltter = this.formGroup.value;

        // console.log('this.formGroup');
        // console.log(this.formGroup.value);

        // console.log('dataFiltter');
        // console.log(dataFiltter);

        // console.log('this.formGroup.value.towns');
        // console.log(this.formGroup.value['towns']);

        // for (const property of dataFiltter) {
        //     console.log('${property}: ${dataFiltter[property]}');
        //     console.log(`${property}: ${dataFiltter[property]}`);
        // }


        // if (this.formGroup.value.hasOwnProperty(this.towns)) {

        // }

        // this.allViewParams.push('start_time_zone:' + this.formGroup.value.startDate);
        // this.allViewParams.push(this.formGroup.value.endDate);
        // this.allViewParams.push(this.formGroup.value.startTimeZones);
        // this.allViewParams.push(this.formGroup.value.endTimeZones);
        // this.allViewParams.push(this.formGroup.value.towns);
        // this.allViewParams.push(this.formGroup.value.involveds);
        // this.allViewParams.push(this.formGroup.value.wounds);
        // this.allViewParams.push(this.formGroup.value.autoTypes);
        // this.allViewParams.push(this.formGroup.value.genders);
        // this.allViewParams.push(this.formGroup.value.weekDays);



        // console.log('this.allViewParams');
        // console.log(this.allViewParams);

        this.bottomSheetRef.dismiss(dataFiltter);
        event.preventDefault();
    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.cveSubsector = this.formGroup.value.subsector;
        this.employee = this.formGroup.value.workers;

        console.log('Filtrado ok');

        // this.service.getActivities(this.formGroup.value.subsector, this.formGroup.value.workers).subscribe(data => {
        //   var listAtivities = []
        //   data.features.forEach(element => {
        //     listAtivities.push(element.properties)
        //   });
        //   this.externalData = listAtivities
        // })
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
      }

}
