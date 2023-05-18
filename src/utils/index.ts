export const uuid = (function() {
  let id = 1;
  return (prefix: string = '') => `${prefix}${id++}`;
}());
