import { CREATE, DECREASESTOCK, UPDATESTOCK } from './actionTypes';

export const createProduct = (product) => {
  return {
    type: CREATE,
    payload: product
  };
};

export const updateStock = (productName, qtyToUpdate, operationType) => {
  return {
    type: UPDATESTOCK,
    payload: { productName, qtyToUpdate, operationType }
  };
};
