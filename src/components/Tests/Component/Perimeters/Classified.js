import BasePerimeter from '@/accessControl/BasePerimeter';

export default new BasePerimeter({
  purpose: 'routeLevelProtection',
  govern: {
    'can route': function canRoute() {
      return this.isAdmin();
    },
  },
});
