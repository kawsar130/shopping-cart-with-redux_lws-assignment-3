import { useDispatch } from 'react-redux';
import { ADDTOCART, REMOVEFROMCART, UPDATECART } from './actionTypes';
import initialState from './initialState';

const dispatch = useDispatch;

const getTotalQtyAndPrice = (cart) => {
  // Getting total product qty in Cart
  const totalQty = cart.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue.qty),
    0
  );

  // Getting total price in Cart
  const totalPrice = cart.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.price) * parseInt(currentValue.qty),
    0
  );

  return {
    totalQty,
    totalPrice
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDTOCART: {
      const cart = [...state.cart];
      const addedProduct = { ...action.payload, qty: 1 };

      if (cart?.length < 1) {
        // If the cart is empty
        cart.push(addedProduct);
      } else {
        // if the cart contains some products
        let existingProductIndex;
        let existingProduct = cart.find((product, index) => {
          if (product?.name === addedProduct?.name) {
            existingProductIndex = index;
            return true;
          }
        });

        // if the product is already in the cart, we are updating the qty
        if (existingProduct) {
          const newQty = parseInt(existingProduct.qty) + 1;
          const updatedProduct = { ...existingProduct, qty: newQty };
          cart[existingProductIndex] = updatedProduct;
        } else {
          // if the product is new in the cart, we are adding it.
          cart.push(addedProduct);
        }
      }

      const { totalQty, totalPrice } = getTotalQtyAndPrice(cart);
      console.log(cart);

      return {
        ...state,
        cart,
        totalQty,
        totalPrice
      };
      break;
    }

    case UPDATECART: {
      const { productName, qtyToUpdate, operationType } = action.payload;

      const previousCart = [...state.cart];

      let updatedCart = previousCart.map((product) => {
        if (product?.name === productName) {
          const { qty } = product;
          switch (operationType) {
            case 'INCREASE':
              return { ...product, qty: qty + qtyToUpdate };

            case 'DECREASE':
              return {
                ...product,
                qty: qty - qtyToUpdate
              };

            default:
              return product;
          }
        } else return product;
      });

      const { totalQty, totalPrice } = getTotalQtyAndPrice(updatedCart);

      return {
        ...state,
        cart: updatedCart,
        totalQty,
        totalPrice
      };
    }

    case REMOVEFROMCART: {
      const productName = action.payload;

      const previousCart = [...state.cart];

      let updatedCart = previousCart.filter(
        (product) => product?.name !== productName
      );

      const { totalQty, totalPrice } = getTotalQtyAndPrice(updatedCart);

      return {
        ...state,
        cart: updatedCart,
        totalQty,
        totalPrice
      };
    }

    default:
      return state;
  }
};

export default reducer;
