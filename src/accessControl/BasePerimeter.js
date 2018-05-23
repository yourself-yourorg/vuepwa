import { Perimeter } from 'vue-kindergarten';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars


const accessLevels = ['No Access', 'View Only', 'Comment', 'Alter', 'Own'];
// const axsLabels = ['NO_ACCESS', 'VIEW_ONLY', 'COMMENT', 'ALTER', 'OWN'];
const lvls = {};
const lvlOpts = [];
for (let idx = 0; idx < accessLevels.length; idx += 1) {
  const name = accessLevels[idx];
  const value = name.toUpperCase().split(' ').join('_');
  lvls[value] = idx;
  lvlOpts.push({
    name, value: idx, id: idx, label: name,
  });
}

lvls.alvls = accessLevels;
lvls.options = lvlOpts;
lvls.olvls = Array.from(accessLevels, (x, ix) => ({ id: ix, axs: x }));
lvls.slvls = Array.from(accessLevels, (x, ix) => ({ id: ix, axs: x }));

export const Levels = lvls;

export default class BasePerimeter extends Perimeter {
  constructor(purpose, opts = {}) {
    super(purpose, opts);
    this.levels = Levels;
    // LG(`********  Constructor ${this.levels}  *********`);
  }

  mayView() {
    LG(`********  mayView: Permission "${this.levels.alvls[Levels.VIEW_ONLY]}" to resource "${this.resource}".  *********`);
    return this.levels.VIEW_ONLY <= this.child.permissions[this.resource];
  }

  mayComment() {
    LG(`********  mayView: Permission "${this.levels.alvls[Levels.COMMENT]}" to resource "${this.resource}".  *********`);
    return this.levels.COMMENT <= this.child.permissions[this.resource];
  }

  mayAlter() {
    LG(`********  mayView: Permission "${this.levels.alvls[Levels.ALTER]}" to resource "${this.resource}".  *********`);
    return this.levels.ALTER <= this.child.permissions[this.resource];
  }

  mayAuthorize() {
    LG(`********  mayView: Permission "${this.levels.alvls[Levels.OWN]}" to resource "${this.resource}".  *********`);
    return this.levels.OWN <= this.child.permissions[this.resource];
  }
}
