import { style, transition, trigger, animate } from '@angular/animations';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    animations: [
        trigger('toggleDrop', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(
                    '.5s',
                    style({ opacity: 1, transform: 'translateY(0)' }),
                ),
            ]),
            transition('* => void', [
                animate(
                    '.5s',
                    style({ opacity: 0, transform: 'translateY(-20px)' }),
                ),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'drop';

    @Input('options') options: Array<string> = [];
    @Input('defaultSelectedOption') defaultSelectedOption: number | null = null;
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
    subscriptions: Subscription = new Subscription();

    @ViewChild('dropList') dropList: ElementRef<HTMLElement> | undefined;
    @ViewChild('dropTrigger') dropTrigger: ElementRef<HTMLElement>;

    constructor(
        private eRef: ElementRef,
        private changeDetector: ChangeDetectorRef,
        private deviceService: DeviceDetectorService,
        private translate: TranslateService,
    ) {}

    ngOnInit(): void {
        if (!this.value) {
            this._selectedValue.next(
                this.defaultSelectedOption
                    ? this.options[this.defaultSelectedOption]
                    : this.options[0],
            );
        } else {
            const translateSub = this.translate.onLangChange.subscribe(() => {
                this.translate
                    .get(this.value as string)
                    .subscribe((res: string) => {
                        this._selectedValue.next(res);
                    });
            });
            this.subscriptions.add(translateSub);
        }

        const selecedValSub = this._selectedValue.subscribe(resolve => {
            this.selectedOption.emit(resolve);
        });
        this.subscriptions.add(selecedValSub);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    setValue(value: string) {
        this._selectedValue.next(value);

        if (this.listOpened) {
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
        const triggerHeight = getComputedStyle(
            this.dropTrigger?.nativeElement,
        ).height;
        const isDesktop = this.deviceService.isDesktop();
        let pageWidth = 0;
        let pageHeight = 0;

        if (isDesktop) {
            pageWidth = window.innerWidth;
            pageHeight = window.innerHeight;
        } else {
            pageWidth = screen.width;
            pageHeight = screen.height;
        }

        if (this.dropList) {
            const elPosition =
                this.dropList?.nativeElement.getBoundingClientRect();
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
