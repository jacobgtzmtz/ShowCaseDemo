import { Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {
  readonly appHighlight = input<string>('blue');

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() { }

  public onMouseEnter(){
    this.highLight(this.appHighlight());
  }

  public onMouseLeave(){
    this.highLight('');
  }

  private highLight(color: string){
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color)
  }



}
