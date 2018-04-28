import BasePerimeter from '@/accessControl/BasePerimeter';
import GenericPerimeter from '@/accessControl/GenericPerimeter';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const RESOURCE_NAME = 'Person';
class PersonPerimeter extends GenericPerimeter {
  constructor(purpose, opts = {}) {
    super(purpose, opts);
    this.resource = RESOURCE_NAME;
  }
}


export default {
  personDetailPerimeter: new PersonPerimeter({
    purpose: 'elementLevelProtection',
  }),
  personListPerimeter: new BasePerimeter({
    purpose: 'routeLevelProtection',
    resource: RESOURCE_NAME,
    govern: {
      'can route': function canRoute() {
        return this.isAdmin();
      },
    },
  }),
};
