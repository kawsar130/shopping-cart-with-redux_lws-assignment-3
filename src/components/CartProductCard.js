import { removeFromCart, updateCart } from '@/redux/cart/actions';
import { updateStock } from '@/redux/products/actions';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

const CartProductCard = ({ item, products }) => {
  const dispatch = useDispatch();

  const itemData = products.find((product) => product.name === item.name);

  const handleCartQty = (operationType) => {
    if (operationType === 'INCREASE') {
      dispatch(updateCart(item.name, 1, operationType));
      dispatch(updateStock(item.name, 1, 'DECREASE'));
    } else if (operationType === 'DECREASE') {
      dispatch(updateCart(item.name, 1, operationType));
      dispatch(updateStock(item.name, 1, 'INCREASE'));
    }
  };

  const handleRemoveFormCart = () => {
    dispatch(removeFromCart(item.name));
    dispatch(updateStock(item.name, item.qty, 'INCREASE'));
  };

  return (
    <div className="cartCard">
      <div className="flex items-center col-span-6 space-x-6">
        {/* <!-- cart image --> */}
        <Image
          src={item?.image}
          width={100}
          height={50}
          alt="product"
          quality={75}
          priority="false"
          className="lws-cartImage"
        />

        {/* <!-- cart item info --> */}
        <div className="space-y-2">
          <h4 className="lws-cartName">{item?.name}</h4>
          <p className="lws-cartCategory">{item?.category}</p>
          <p>
            BDT <span className="lws-cartPrice">{item?.price}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
        {/* <!-- amount buttons --> */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleCartQty('INCREASE')}
            className="lws-incrementQuantity"
            disabled={itemData?.stock_qty <= 0}
          >
            <i className="text-lg fa-solid fa-plus"></i>
          </button>
          <span className="lws-cartQuantity">{item?.qty}</span>
          <button
            onClick={() => handleCartQty('DECREASE')}
            className="lws-decrementQuantity"
            disabled={item?.qty < 2}
          >
            <i className="text-lg fa-solid fa-minus"></i>
          </button>
        </div>
        {/* <!-- price --> */}
        <p className="text-lg font-bold">
          BDT{' '}
          <span className="lws-calculatedPrice">{item?.qty * item?.price}</span>
        </p>
      </div>
      {/* <!-- delete button --> */}
      <div className="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
        <button onClick={handleRemoveFormCart} className="lws-removeFromCart">
          <i className="text-lg text-red-400 fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};
export default CartProductCard;
