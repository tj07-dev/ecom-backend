const checkStock = (id: number, stock: number) => {
  if (stock > 0) {
    return true;
  } else {
    return false;
  }
};
module.exports = { checkStock };
