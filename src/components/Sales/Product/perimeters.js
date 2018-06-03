import BasePerimeter from '@/accessControl/BasePerimeter';
import GenericPerimeter from '@/accessControl/GenericPerimeter';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const RESOURCE_NAME = 'Product';
class ProductPerimeter extends GenericPerimeter {
  constructor(purpose, opts = {}) {
    super(purpose, opts);
    this.resource = RESOURCE_NAME;
  }
}


export default {
  productDetailPerimeter: new ProductPerimeter({
    purpose: 'elementLevelProtection',
  }),
  productListPerimeter: new BasePerimeter({
    purpose: 'routeLevelProtection',
    resource: RESOURCE_NAME,
    govern: {
      'can route': function canRoute() {
        return this.isAdmin();
      },
    },
  }),
};
