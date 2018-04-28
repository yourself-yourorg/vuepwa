import BasePerimeter from '@/accessControl/BasePerimeter';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

export default class GenericPerimeter extends BasePerimeter {
  constructor(purpose, opts = {}) {
    super(purpose, opts);
    this.govern = {
      'can route': function canRoute() {
        return this.mayView();
      },
      'can viewParagraph': function canViewParagraph() {
        return this.mayView();
      },
      'can toSee': function canSee() {
        return this.mayView();
      },
      'can minorEdits': function canComment() {
        return this.mayComment();
      },
      'can allEdits': function canAlter() {
        return this.mayAlter();
      },
      'can toChangeAuthorizations': function canAuthorize() {
        return this.mayAuthorize();
      },
    };
  }
}
