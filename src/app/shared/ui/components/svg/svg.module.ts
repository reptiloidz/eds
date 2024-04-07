import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { SvgComponent } from "./svg.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [SvgComponent],
    imports: [CommonModule],
    exports: [SvgComponent],
    schemas: [NO_ERRORS_SCHEMA]
})

export class SvgModule {}
