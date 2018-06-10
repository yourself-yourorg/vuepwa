const LG = console.log; // eslint-disable-line no-console, no-unused-vars

export default {
  text: v => v,
  integer: v => v,
  title: v => v,
  percent: v => `${(v * 100).toFixed(0)}%`,
  boolean: v => v === 'si',
  JSON1: (v, pkg) => pkg.JSON1.fn(pkg.JSON1.vl),
  foreignKey1: (v, pkg) => {
    // LG(v);
    // LG(pkg.foreignKey1);
    const rslt = pkg.foreignKey1.fn(pkg.foreignKey1.vl);
    return rslt;
  },
  usd: v => v,
  // usd: (v) => {
  //   // LG(`Format to usd : ${v}`);
  //   const rslt = v ? `$${v.toFixed(2)}` : '';
  //   return rslt;
  // },
  date: (v) => {
    // const options = {
    //   year: 'numeric',
    //   month: 'numeric',
    //   day: 'numeric',
    // };
    // const date = new Date(Date.parse(v)).toLocaleDateString('fr-FR', options);
    const date = new Date(Date.parse(v)).toISOString().split('T')[0];
    return date;
  },
};
