import BasePerimeter from '@/accessControl/BasePerimeter';
import GenericPerimeter from '@/accessControl/GenericPerimeter';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const RESOURCE_NAME = 'Invoice';
class InvoicePerimeter extends GenericPerimeter {
  constructor(purpose, opts = {}) {
    super(purpose, opts);
    this.resource = RESOURCE_NAME;
  }
}


export default {
  invoiceDetailPerimeter: new InvoicePerimeter({
    purpose: 'elementLevelProtection',
  }),
  invoiceListPerimeter: new BasePerimeter({
    purpose: 'routeLevelProtection',
    resource: RESOURCE_NAME,
    govern: {
      'can route': function canRoute() {
        return this.isAdmin();
      },
    },
  }),
};
