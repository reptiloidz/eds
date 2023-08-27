import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { DailySpacePicture } from "./interface";
import { Observable } from "rxjs";
import { inject } from "@angular/core";
import { NasaService } from "../services/nasa.service";

export const DayResolver: ResolveFn<DailySpacePicture> = (
    route: ActivatedRouteSnapshot
): Observable<DailySpacePicture> => {
    return inject(NasaService).getPictureByDate(route.paramMap.get('date')!);
}
