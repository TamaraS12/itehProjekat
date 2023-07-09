import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFrame]'
})
export class FrameDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.boxShadow = '10px 10px 33px lightblue';
   }

}
