import BasePerimeter from '@/accessControl/BasePerimeter';
import { perimeters as ComponentPerimeters } from '@/components';

const ExamplePerimeters = {
  protectedPerimeter: new BasePerimeter({
    purpose: 'elementLevelProtection',
    govern: {
      'can route': () => true,
      'can viewParagraph': function canViewParagraph() {
        return this.isAdmin();
      },
    },
  }),
  classifiedPerimeter: new BasePerimeter({
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
