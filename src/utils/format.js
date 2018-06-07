const LG = console.log; // eslint-disable-line no-console, no-unused-vars

export default {
  text: v => v,
  integer: v => v,
  title: v => v,
  percent: v => `${(v * 100).toFixed(0)}%`,
  boolean: (v) => {
    LG(`Format to boolean : ${v} vs ${v === 'si'}`);
    return v === 'si';
  },

  JSON1: (v, pkg) => {
    LG(v);
    LG(pkg.JSON1);
    return pkg.JSON1.fn(pkg.JSON1.vl);
  },
  foreignKey1: (v, pkg) => {
    LG(v);
    LG(pkg.foreignKey1);
    pkg.foreignKey1.fn(pkg.foreignKey1.vl);
    return v;
  },
  usd: (v) => {
    // LG(`Format to usd : ${v}`);
    const rslt = v ? `$${v.toFixed(2)}` : '';
    return rslt;
  },
  date: (v) => {
    // LG(`Format to locale date : ${v}`);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    // LG(`Result : ${new Date(Date.parse(v)).toLocaleDateString('en-US', options)}`);
    return new Date(Date.parse(v)).toLocaleDateString('en-US', options);
  },
};
