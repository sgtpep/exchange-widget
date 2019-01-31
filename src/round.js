export default (number, decimals = 2) =>
  Number(`${Math.round(`${number}e+${decimals}`)}e-${decimals}`);
