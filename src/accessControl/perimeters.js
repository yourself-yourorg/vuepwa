import BasePerimeter from '@/accessControl/BasePerimeter';
import { perimeters as ComponentPerimeters } from '@/components';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

class ExamplePerimeter extends BasePerimeter {
  constructor(purpose, opts = {}) {
    super(purpose, opts);
    this.resource = 'Example';
  }

  isViewer() {
    // LG(`********  isViewer ${this.resource}  *********`);
    return this.mayView(this.resource);
  }
}

const ExamplePerimeters = {
  protectedPerimeter: new ExamplePerimeter({
  // protectedPerimeter: new BasePerimeter({
    purpose: 'elementLevelProtection',
    govern: {
      'can route': () => true,
      'can viewParagraph': function canViewParagraph() {
        // return this.isAdmin();
        return this.isViewer();
      },
    },
  }),
  classifiedPerimeter: new ExamplePerimeter({
    purpose: 'routeLevelProtection',
    govern: {
      'can route': function canRoute() {
        return this.isAdmin();
      },
    },
  }),
};

export default Object.assign(
  {},
  ExamplePerimeters,
  ComponentPerimeters,
);
