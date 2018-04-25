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

const findRoleInResource = (user, rsrce, lvl) => {
  LG('********  findRoleInResource  *********');
  LG(user.permissions);
  LG(`********  ${rsrce}  *********`);
  const priv = user.permissions[rsrce];
  const idx = accessLevels.findIndex(el => el === priv);
  LG(`******** (${lvl} <= ${idx}) true? *********`);
  return lvl <= accessLevels.findIndex(el => el === priv);
};

export default class BasePerimeter extends Perimeter {
  constructor(purpose, opts = {}) {
    super(purpose, opts);
    this.levels = Levels;
    // LG(`********  Constructor ${this.levels}  *********`);
  }

  isAdmin() {
    return this.child && this.child.role === 'admin';
  }
  mayView(resource) {
    LG(`********  mayView: Permission "${this.levels.alvls[VIEW_ONLY]}" to resource "${resource}".  *********`);
    LG(this.child.permissions);
    // return findRoleInResource(resource, this.levels.VIEW_ONLY);
    return findRoleInResource(this.child, resource, this.levels.VIEW_ONLY);
  }
}
