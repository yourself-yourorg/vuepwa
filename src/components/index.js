import { perimeters as AdminPerimeters } from './Admin';
import { perimeters as SalesPerimeters } from './Sales';

export const perimeters = Object.assign( // eslint-disable-line import/prefer-default-export
  {},
  AdminPerimeters,
  SalesPerimeters,
);
