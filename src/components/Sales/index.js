import ProductPerimeters from './Product/perimeters';
import InvoicePerimeters from './Invoice/perimeters';

export const perimeters = Object.assign( // eslint-disable-line import/prefer-default-export
  {},
  ProductPerimeters,
  InvoicePerimeters,
);
