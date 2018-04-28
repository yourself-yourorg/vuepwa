import BasePerimeter from '@/accessControl/BasePerimeter';
import GenericPerimeter from '@/accessControl/GenericPerimeter';
import { perimeters as ComponentPerimeters } from '@/components';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const RESOURCE_NAME = 'Example';
class ExamplePerimeter extends GenericPerimeter {
  constructor(purpose, opts = {}) {
    super(purpose, opts);
    this.resource = RESOURCE_NAME;
  }
}

const ExamplePerimeters = {
  protectedPerimeter: new ExamplePerimeter({
    purpose: 'elementLevelProtection',
  }),
  classifiedPerimeter: new BasePerimeter({
    purpose: 'routeLevelProtection',
    resource: RESOURCE_NAME,
    govern: {
      'can route': function canRoute() {
        return this.mayView();
      },
    },
  }),
};

export default Object.assign(
  {},
  ExamplePerimeters,
  ComponentPerimeters,
);
