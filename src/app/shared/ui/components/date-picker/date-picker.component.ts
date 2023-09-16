import { Component, OnInit } from '@angular/core';
import { CalendarMonths } from 'src/app/shared/enums/calendar.enum';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html'
})
export class DatePickerComponent implements OnInit {

    // months = CalendarMonths;
    dates:Array<Date> = [];
    row:Array<Array<Date>> = [[],[],[],[],[],[]];
    disabledDay = new Date().getDate();

    ngOnInit(): void {
        let d  = new Date(2023,1,4);
        let today = new Date(2023,1,4);

        for (let index = 1; index <= 31; index++) {
            if (today.getMonth() === new Date(d.setDate(index)).getMonth()) {
                this.dates.push(new Date(d.setDate(index)));
            }
        }


        let j = 0;

        for (let i = 0; i < this.dates.length; i++) {
            this.row[j].push(this.dates[i]);
            if (this.dates[i].getDay() === 0) {
                j++;
                console.log(this.dates[i]);
            }
            // console.log(this.dates[i]);
        }

        // console.log(this.row);
    }
}
