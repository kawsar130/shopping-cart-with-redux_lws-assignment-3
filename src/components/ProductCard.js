import { addToCart } from '@/redux/cart/actions';
import { updateStock } from '@/redux/products/actions';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const updatedProduct = { ...product };
    delete updatedProduct.stock_qty; // Deleting Stock Quantity before adding to cart
    dispatch(addToCart(updatedProduct));
    dispatch(updateStock(product?.name, 1, 'DECREASE'));
  };

  return (
    <div className="lws-productCard">
      <Image
        src={product.image}
        width={100}
        height={50}
        alt="product"
        quality={75}
        priority="false"
        className="lws-productImage"
      />

      <div className="p-4 space-y-2">
        <h4 className="lws-productName">{product?.name}</h4>
        <p className="lws-productCategory">{product?.category}</p>
        <div className="flex items-center justify-between pb-2">
          <p className="productPrice">
            BDT <span className="lws-price">{product?.price}</span>
          </p>
          <p className="productQuantity">
            QTY <span className="lws-quantity">{product?.stock_qty}</span>
          </p>
        </div>
        <button
          onClick={() => handleAddToCart(product)}
          className="lws-btnAddToCart"
          disabled={product?.stock_qty === 0}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
