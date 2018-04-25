import BasePerimeter from '@/accessControl/BasePerimeter';

class PersonPerimeter extends BasePerimeter {
  constructor(purpose, opts = {}) {
    super(purpose, opts);
    this.resource = 'Person';
  }
}


// class PersonPerimeter extends BasePerimeter {
//   isViewer() {
//     return this.isViewer('Person');
//   }
// };

export default {
  personDetailPerimeter: new PersonPerimeter({
    purpose: 'elementLevelProtection',
    govern: {
      'can route': () => true,
      'can viewParagraph': function canViewParagraph() {
        return this.isAdmin();
      },
    },
  }),
  personListPerimeter: new PersonPerimeter({
    purpose: 'routeLevelProtection',
    govern: {
      'can route': function canRoute() {
        return this.isAdmin();
      },
    },
  }),
};
