import { Perimeter } from 'vue-kindergarten';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars


const accessLevels = [];

const NO_ACCESS = 0;
accessLevels[NO_ACCESS] = 'No Access';

const VIEW_ONLY = NO_ACCESS + 1;
accessLevels[VIEW_ONLY] = 'View Only';

const COMMENT = VIEW_ONLY + 1;
accessLevels[COMMENT] = 'Comment';

const ALTER = COMMENT + 1;
accessLevels[ALTER] = 'Alter';

const OWN = ALTER + 1;
accessLevels[OWN] = 'Own';

export const Levels = {
  alvls: accessLevels,
  olvls: Array.from(accessLevels, (x, ix) => ({ id: ix, axs: x })),
  NO_ACCESS,
  VIEW_ONLY,
  COMMENT,
  ALTER,
  OWN,
};

export default class BasePerimeter extends Perimeter {
  constructor(purpose, opts = {}) {
    super(purpose, opts);
    this.levels = Levels;
    // LG(`********  Constructor ${this.levels}  *********`);
  }

  mayView() {
    LG(`********  mayView: Permission "${this.levels.alvls[VIEW_ONLY]}" to resource "${this.resource}".  *********`);
    return this.levels.VIEW_ONLY <= this.child.permissions[this.resource];
  }

  mayComment() {
    LG(`********  mayView: Permission "${this.levels.alvls[COMMENT]}" to resource "${this.resource}".  *********`);
    return this.levels.COMMENT <= this.child.permissions[this.resource];
  }

  mayAlter() {
    LG(`********  mayView: Permission "${this.levels.alvls[ALTER]}" to resource "${this.resource}".  *********`);
    return this.levels.ALTER <= this.child.permissions[this.resource];
  }

  mayAuthorize() {
    LG(`********  mayView: Permission "${this.levels.alvls[OWN]}" to resource "${this.resource}".  *********`);
    return this.levels.OWN <= this.child.permissions[this.resource];
  }
}
