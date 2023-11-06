import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { TestBed } from "@angular/core/testing";
import { SanitizerPipe } from "./sanitizer.pipe";
import { SecurityContext } from "@angular/core";

describe('Sanitizer pipe', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule],
        });
    });

    it('should create an instance', () => {
        const domSanitizer = TestBed.inject(DomSanitizer);
        const pipe = new SanitizerPipe(domSanitizer);
        expect(pipe).toBeTruthy();
    });

    it('should sanitize url', () => {
        const domSanitizer = TestBed.inject(DomSanitizer);
        const pipe = new SanitizerPipe(domSanitizer);
        const url = pipe.transform('https://google.com');
        const sanitizedValue = domSanitizer.sanitize(SecurityContext.RESOURCE_URL, url);

        expect(sanitizedValue).toBe('https://google.com');
    });
});
