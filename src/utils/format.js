export default {
  usd: v => `$${v.toFixed(2)}`,
  text: v => v,
  integer: v => v,
  title: v => v,
  percent: v => `${(v * 100).toFixed(0)}%`,
  date: v => v,
  boolean: v => v,
  foreign_key: v => v,
};
