import initialState from './initialState';
const { CREATE, UPDATESTOCK } = require('./actionTypes');

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return [...state, action.payload];

    case UPDATESTOCK:
      const { productName, qtyToUpdate, operationType } = action.payload;
      console.log(productName);

      const previousProducts = [...state];

      let updatedProducts = previousProducts.map((product) => {
        if (product?.name === productName) {
          const { stock_qty } = product;
          switch (operationType) {
            case 'INCREASE':
              return {
                ...product,
                stock_qty: parseInt(stock_qty) + qtyToUpdate
              };

            case 'DECREASE':
              return {
                ...product,
                stock_qty: parseInt(stock_qty) - qtyToUpdate
              };

            default:
              return product;
          }
        } else return product;
      });

      console.log(updatedProducts);

      return updatedProducts;

    default:
      return state;
  }
};

export default reducer;
