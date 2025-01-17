function calculateCartTotal(cart) {
    let totalHT = 0;
    let totalTax = 0;

    cart.forEach((product) => {
        const productTotalHT = product.price * product.quantity;
        const productTax = productTotalHT * (product.taxRate / 100);
        totalHT += productTotalHT;
        totalTax += productTax;
    });

    const totalTTC = totalHT + totalTax;
    return {
        totalHT: totalHT.toFixed(2),
        totalTax: totalTax.toFixed(2),
        totalTTC: totalTTC.toFixed(2),
    };
}

function calculateDiscount(cart, discountRate) {
  const { totalTTC } = calculateCartTotal(cart);
  const discount = ((totalTTC * discountRate) / 100).toFixed(2);
  return discount;
}

module.exports = { calculateCartTotal, calculateDiscount };
