import { Directive, ElementRef, Renderer2, OnInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCheckboxHover]'
})
export class CheckboxHoverDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onHover() {
    let nextSubtask = this.el.nativeElement.parentElement
    .parentElement.parentElement.nextElementSibling;

    // console.log(nextSubtask);
    while (nextSubtask) {
      const checkmark = nextSubtask.children[0].children[0]
      .children[0].children[0].children[1].children[1];

      if (checkmark) {
        this.renderer.addClass(checkmark, 'display-checkmark');
      }


      nextSubtask = nextSubtask.nextElementSibling;
    }
  }

  @HostListener('mouseleave')
  onMouseleave() {
    let nextSubtask = this.el.nativeElement.parentElement
    .parentElement.parentElement.nextElementSibling;

    // console.log(nextSubtask);
    while (nextSubtask) {
      const checkmark = nextSubtask.children[0].children[0]
      .children[0].children[0].children[1].children[1];

      if (checkmark) {
        this.renderer.removeClass(checkmark, 'display-checkmark');
      }

      nextSubtask = nextSubtask.nextElementSibling;
    }
  }

}
