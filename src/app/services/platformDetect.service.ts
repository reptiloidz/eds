import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PlatformDetector {
    getDevicePlatform() {
        return (navigator as any).userAgentData;
    }
}
