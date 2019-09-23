import { Directive, HostBinding, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective{
  @HostBinding('class.open') class: string = '';

  @HostListener('mouseenter', ['$event']) mouseover(eventData: Event){
    this.class = 'open';
  }
  @HostListener('mouseleave', ['$event']) mouseleave(eventData: Event){
    this.class = '';
  }
}
