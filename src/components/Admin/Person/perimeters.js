import BasePerimeter from '@/accessControl/BasePerimeter';

export default {
  personDetailPerimeter: new BasePerimeter({
    purpose: 'elementLevelProtection',
    govern: {
      'can route': () => true,
      'can viewParagraph': function canViewParagraph() {
        return this.isAdmin();
      },
    },
  }),
  personListPerimeter: new BasePerimeter({
    purpose: 'routeLevelProtection',
    govern: {
      'can route': function canRoute() {
        return this.isAdmin();
      },
    },
  }),
};
