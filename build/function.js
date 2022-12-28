"use strict";
const checkStock = (id, stock) => {
    if (stock > 0) {
        return true;
    }
    else {
        return false;
    }
};
module.exports = { checkStock };
