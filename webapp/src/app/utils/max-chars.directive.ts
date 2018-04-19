import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMaxChars]'
})
export class MaxCharsDirective {

  @Input() appMaxChars: Number = 6;

  constructor(private element: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
      // Allow backspace and delete
      let e = <KeyboardEvent>event;
      if (e.code == 'Backspace' || e.code == 'Delete') return;

      // Prevent default if already at maxChars
      if (this.element.nativeElement.value.length >= this.appMaxChars)
        e.preventDefault();
  }
}
