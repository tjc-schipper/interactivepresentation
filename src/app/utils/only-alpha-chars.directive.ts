import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyAlpha]'
})
export class OnlyAlphaCharsDirective {

  regexStr = '^Key[A-Z]*$';

  constructor(private element: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    // Allow backspace and delete
    let e = <KeyboardEvent>event;
    if (e.code == 'Backspace' || e.code == 'Delete') return;

    // Prevent if not an alpha key
    let regex = new RegExp(this.regexStr);
    if (regex.test(e.code)) return;
    else e.preventDefault();
  }

}
