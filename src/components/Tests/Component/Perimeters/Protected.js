import BasePerimeter from '@/accessControl/BasePerimeter';

export default new BasePerimeter({
  purpose: 'elementLevelProtection',
  govern: {
    'can route': () => true,
    'can viewParagraph': function canViewParagraph() {
      return this.isAdmin();
    },
  },
});
