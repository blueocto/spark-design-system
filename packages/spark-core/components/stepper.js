/* global document */
import getElements from '../utilities/getElements';
import { carousel } from './carousel';
import {
  getActiveTabIndex,
  handleTabKeydown,
  resetTabs,
  setActiveTab,
} from './tabs';

/**
 * Takes in the stepper container.
 * Gets all the steps in container.
 * Binds click listener to each step.
 * Binds keydown listener to each step.
 * @param {NodeList} stepper - Collection of stepper container.
 */
const bindUIEvents = (stepper, carouselContainer) => {
  let carouselInstance;
  const steps = stepper.querySelectorAll('[data-sprk-stepper="step"]');
  if (!steps) {
    return;
  }
  if (carouselContainer) {
    carouselInstance = carousel(carouselContainer);
  }
  const stepPanels = stepper.querySelectorAll('[role="tabpanel"]');
  const activeClass = 'sprk-c-Stepper__step--selected';
  const hasSlideEffect = stepper.querySelector(
    '[data-sprk-stepper="description"]',
  );
  let sliderEl;

  steps[0].classList.add('sprk-c-Stepper__step--first');
  steps[steps.length - 1].classList.add('sprk-c-Stepper__step--last');

  if (carouselContainer) {
    carouselContainer.addEventListener('sprk.carousel.slide', e => {
      e.preventDefault();
      const { index } = e.detail;
      resetTabs(steps, stepPanels, activeClass, sliderEl);
      setActiveTab(steps[index], stepPanels[index], activeClass, sliderEl);
    });
  }

  // If the stepper has stepper descriptions then build slider
  if (hasSlideEffect) {
    sliderEl = document.createElement('li');
    sliderEl.classList.add('sprk-c-Stepper__slider');
    sliderEl.setAttribute('data-sprk-stepper', 'slider');
    stepper.prepend(sliderEl);
  }

  const activeTab = getActiveTabIndex(steps, activeClass);
  setActiveTab(steps[activeTab], stepPanels[activeTab], activeClass, sliderEl);

  steps.forEach((step, index) => {
    const stepTrigger = step.querySelector('[role="tab"]');
    if (!stepTrigger) {
      return;
    }
    if (hasSlideEffect) step.classList.add('sprk-c-Stepper__step--has-slider');

    stepTrigger.addEventListener('click', e => {
      e.preventDefault();
      resetTabs(steps, stepPanels, activeClass, sliderEl);
      setActiveTab(step, stepPanels[index], activeClass, sliderEl);
      if (carouselInstance) {
        carouselInstance.slideTo(index);
      }
    });
  });

  stepper.addEventListener('keydown', event => {
    handleTabKeydown(event, steps, stepPanels, activeClass, sliderEl);
    if (carouselInstance) {
      carouselInstance.slideTo(getActiveTabIndex(steps, activeClass));
    }
  });
};

const stepper = () => {
  getElements('[data-sprk-stepper="container"]', item => {
    let carouselContainer;
    const partnerCarouselID = item.getAttribute('data-sprk-stepper-carousel');
    if (partnerCarouselID) {
      carouselContainer = document.querySelector(
        `[data-sprk-carousel=${partnerCarouselID}]`,
      );
    }
    bindUIEvents(item, carouselContainer);
  });
};

export { stepper, bindUIEvents };
