import { Directive, ElementRef, HostListener, OnInit, AfterViewInit, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appTextareaAutosize]'
})
export class TextareaAutosizeDirective implements OnInit, AfterViewInit {

  // tslint:disable-next-line: no-input-rename
  @Input('appTextareaAutosize') divider: any;
  // tslint:disable-next-line: no-input-rename
  @Input('task-box') parentLi;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.autoResize();
  }

  @HostListener('keyup')
  @HostListener('change')
  @HostListener('paste')
  @HostListener('cut')
  autoResize() {
    this.renderer.setStyle(this.el.nativeElement, 'height', '0px');
    this.renderer.setStyle(this.el.nativeElement, 'height', String(this.el.nativeElement.scrollHeight) + 'px');
  }

  @HostListener('focus')
  onFocus() {
    // console.log(this.divider);
    // console.log(this.parentLi);
    if (this.divider && this.parentLi) {
      this.renderer.setStyle(this.divider, 'background', '#22A7F0');
      // this.renderer.setStyle(this.divider, 'border-width', '1px');
      this.renderer.setStyle(this.parentLi, 'background', '#f8f9fa');
    }

  }

  @HostListener('blur')
  onBlur() {
    if (this.divider && this.parentLi) {
      this.renderer.setStyle(this.divider, 'background', 'inherit');
      // this.renderer.setStyle(this.divider, 'border-width', '1px');
      this.renderer.setStyle(this.parentLi, 'background', 'none');
    }
    // console.log(this.divider);

  }
}
