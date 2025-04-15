export const getDiscountAmount = (totalPrice, discountPercent) => {
  const discountedAmount = (totalPrice * discountPercent) / 100;
  return totalPrice - discountedAmount;
};
