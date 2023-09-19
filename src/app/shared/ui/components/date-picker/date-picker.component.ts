import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { CalendarMonths } from 'src/app/shared/enums/calendar.enum';
import { DatePickerDay } from './interface/date-picker.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html'
})
export class DatePickerComponent implements OnInit {

    @HostBinding('class') class = 'date-picker';

    @Output('selectedDate') selectedDate = new EventEmitter();

    // months = CalendarMonths;
    // Массив дат месяца
    dates:Array<DatePickerDay>;

    // Массив дат месяца, разбитый на недели
    weeks:Array<Array<DatePickerDay | null>>;

    months = Object.values(CalendarMonths).filter((v) => isNaN(Number(v))) as Array<string>;

    month = new Date().getMonth();

    public selectedDay$ = new BehaviorSubject('');

    ngOnInit(): void {
        this.generateDates(2023, this.month);
    }

    generateDates(year: number, month: number) {
        this.dates = [];
        this.weeks = [[],[],[],[],[],[]];

        // Переменная для установки дат
        const startDate  = new Date(year, month, 1);

        // Номер месяца для фильтрации дат
        const compareMonth = new Date(year, month, 1).getMonth();

        // Индекс недели в массиве дат
        let weekIndex = 0;

        // Генерируем массив дат с 1 по 31
        for (let i = 1; i <= 31; i++) {

            // Фильтруем даты, в массив попадают только дни заданного месяца
            if (compareMonth === new Date(startDate.setDate(i)).getMonth()) {

                this.dates.push({
                    date: new Date(startDate.setDate(i)),
                    disabled: false
                });

                // Фильтруем ещё не наступившие даты и устанавливаем им значение
                // disabled = true
                if (((+this.dates[i - 1]?.date) - Date.now()) > 0 ) {
                    this.dates[i - 1].disabled = true;
                }
            }
        }

        // Разбиваем массив дат на подмассивы - недели
        for (let i = 0; i < this.dates.length; i++) {
            this.weeks[weekIndex].push(this.dates[i]);

            // Переключаем на следующую неделю. Конечный день - воскресенье (индекс === 0)
            if (this.dates[i].date.getDay() === 0) {
                weekIndex++;
            }
        }

        // Если первая неделя начинается не с понедельника,
        // то добавляем вместо недостающий дней null
        if (this.weeks[0].length != 7) {
            const firstWeekLength = this.weeks[0].length;

            for (let i = 0; i < (7 - firstWeekLength); i++) {
                this.weeks[0].unshift(null);
            }
        }
    }

    setDate(day: Date) {
        this.selectedDate.emit(day);
        this.selectedDay$.next(day.toString());
    }

    getMonth(event: string) {
        this.months.forEach((value, index) => {
            if (event === value) {
                this.generateDates(2023, index);
            }
        })

    }
}
