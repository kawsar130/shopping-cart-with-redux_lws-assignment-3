import { ADDTOCART, REMOVEFROMCART, UPDATECART } from './actionTypes';

export const addToCart = (product) => {
  return {
    type: ADDTOCART,
    payload: product
  };
};

export const updateCart = (productName, qtyToUpdate, operationType) => {
  return {
    type: UPDATECART,
    payload: { productName, qtyToUpdate, operationType }
  };
};

export const removeFromCart = (productName) => {
  return {
    type: REMOVEFROMCART,
    payload: productName
  };
};
