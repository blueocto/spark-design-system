import {
  Directive,
  Input,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[sprkHeading]'
})

export class SprkHeadingDirective {
  /**
   * @ignore
   */
  constructor() { }

  @Input()
  variant: 'one' |
  'two' | 'three' |
  'four' | 'five' |
  'six' | 'seven';

  @HostBinding('class.sprk-b-TypeDisplayOne')
  get headingOne() {
    return this.variant === 'one';
  }
  @HostBinding('class.sprk-b-TypeDisplayTwo')
  get headingTwo() {
    return this.variant === 'two';
  }
  @HostBinding('class.sprk-b-TypeDisplayThree')
  get headingThree() {
    return this.variant === 'three';
  }
  @HostBinding('class.sprk-b-TypeDisplayFour')
  get headingFour() {
    return this.variant === 'four';
  }
  @HostBinding('class.sprk-b-TypeDisplayFive')
  get headingFive() {
    return this.variant === 'five';
  }
  @HostBinding('class.sprk-b-TypeDisplaySix')
  get headingSix() {
    return this.variant === 'six';
  }
  @HostBinding('class.sprk-b-TypeDisplaySeven')
  get headingSeven() {
    return this.variant === 'seven';
  }

  @HostBinding('class.sprk-b-PageTitle')
  /**
   * Value will be used to select
   * the heading style.
   */
  @Input() isPageTitle = false;
}
