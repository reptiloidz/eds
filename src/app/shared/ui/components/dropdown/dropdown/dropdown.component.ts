import { style, transition, trigger, animate } from '@angular/animations';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';
import { PlatformDetector } from 'src/app/services/platformDetect.service';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    animations: [
        trigger('toggleDrop', [
            transition('void => *', [
                style({ opacity: 0,  }),
                animate('.5s', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
            transition('* => void', [
                animate('.5s', style({ opacity: 0, transform: 'translateY(-20px)' })),
            ]),
        ])
    ]
})
export class DropdownComponent implements OnInit {

    @HostBinding('class') class = 'drop';

    @Input('options') options: Array<string> = [];
    @Input('defaultSelectedOption') defaultSelectedOption = 0;
    @Input('value') value: string | null = null;
    @Input('triggerClass') triggerClass: string;

    @Output('selectedOption') selectedOption = new EventEmitter();

    @HostListener('document:click', ['$event']) clickOut(event: Event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.listOpened = false;
        }
    }

    public _selectedValue = new BehaviorSubject('');

    listOpened = false;

    @ViewChild('dropList') dropList: ElementRef<HTMLElement> | undefined;
    @ViewChild('dropTrigger') dropTrigger: ElementRef<HTMLElement>;

    constructor(
        private eRef: ElementRef,
        private changeDetector: ChangeDetectorRef,
        private platformDetector: PlatformDetector,
        private deviceService: DeviceDetectorService
    ) {}

    ngOnInit(): void {
        if (!this.value) {
            this._selectedValue.next(
                this.defaultSelectedOption ? this.options[this.defaultSelectedOption] : this.options[0]
            );
        } else {
            this._selectedValue.next(this.value);
        }

        this._selectedValue.subscribe(resolve => {
            this.selectedOption.emit(resolve);
        });
    }

    setValue(value: string) {
        this._selectedValue.next(value);

        if(this.listOpened) {
            this.toggleDrop();
        }
    }

    toggleDrop() {
        this.listOpened = !this.listOpened;
        this.changeDetector.detectChanges();

        if (this.listOpened) {
            this.setPosition();
        }

        // requestAnimationFrame(() => {
        //     this.setPosition()
        // });
    }

    setPosition() {
        const triggerHeight = getComputedStyle(this.dropTrigger?.nativeElement).height;
        const isDesktop = this.deviceService.isDesktop();
        let pageWidth = 0;
        let pageHeight = 0;
        console.log(isDesktop);

        if (isDesktop) {
            pageWidth = window.innerWidth;
            pageHeight = window.innerHeight;
        } else {
            pageWidth = screen.width;
            pageHeight = screen.height;
        }

        if (this.dropList) {
            const elPosition = this.dropList?.nativeElement.getBoundingClientRect();
            const offsetX = pageWidth - elPosition.x - elPosition.width;
            const offsetY = pageHeight - elPosition.bottom - elPosition.height;

            if (offsetX > 0) {
                this.dropList.nativeElement.style.left = '0';
            }
            if (elPosition.right > pageWidth) {
                this.dropList.nativeElement.style.right = '0';
            }

            if (elPosition.y < 0) {
                this.dropList.nativeElement.style.top = '0';
            }

            if (offsetY < 0) {
                this.dropList.nativeElement.style.bottom = '0' + triggerHeight;
            }
        }
    }
}
