export default (number, decimals = 0) =>
  Number(`${Math.round(`${number}e+${decimals}`)}e-${decimals}`);
