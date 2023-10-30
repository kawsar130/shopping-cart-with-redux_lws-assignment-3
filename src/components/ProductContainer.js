import { useForm } from 'react-hook-form';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '@/redux/products/actions';

const ProductContainer = () => {
  const { register, handleSubmit, reset } = useForm();

  let products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const productData = { ...data, stock_qty: parseInt(data.stock_qty) };
    dispatch(createProduct(productData));
    reset();
    console.log(productData);
  };

  return (
    <main className="py-16">
      <div className="productWrapper">
        {/* <!-- products container --> */}

        <div className="productContainer" id="lws-productContainer">
          {products?.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p>No Product Found!</p>
          )}
        </div>

        {/* <!-- products container ends --> */}

        <div>
          {/* <!-- Product Input Form --> */}
          <div className="formContainer">
            <h4 className="formTitle">Add New Product</h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4 text-[#534F4F]"
              id="lws-addProductForm"
            >
              {/* <!-- product name --> */}
              <div className="space-y-2">
                <label htmlFor="lws-inputName">Product Name</label>
                <input
                  className="addProductInput"
                  id="lws-inputName"
                  type="text"
                  {...register('name', { required: true })}
                />
              </div>
              {/* <!-- product category --> */}
              <div className="space-y-2">
                <label htmlFor="lws-inputCategory">Category</label>
                <input
                  className="addProductInput"
                  id="lws-inputCategory"
                  type="text"
                  {...register('category', { required: true })}
                />
              </div>
              {/* <!-- product image url --> */}
              <div className="space-y-2">
                <label htmlFor="lws-inputImage">Image Url</label>
                <input
                  className="addProductInput"
                  id="lws-inputImage"
                  type="text"
                  {...register('image', { required: true })}
                />
              </div>
              {/* <!-- price & quantity container --> */}
              <div className="grid grid-cols-2 gap-8 pb-4">
                {/* <!-- price --> */}
                <div className="space-y-2">
                  <label htmlFor="ws-inputPrice">Price</label>
                  <input
                    className="addProductInput"
                    type="number"
                    id="lws-inputPrice"
                    {...register('price', { required: true })}
                  />
                </div>
                {/* <!-- quantity --> */}
                <div className="space-y-2">
                  <label htmlFor="lws-inputQuantity">Quantity</label>
                  <input
                    className="addProductInput"
                    type="number"
                    id="lws-inputQuantity"
                    {...register('stock_qty', { required: true })}
                  />
                </div>
              </div>
              {/* <!-- submit button --> */}
              <button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                id="lws-inputSubmit"
                className="submit "
              >
                Add Product
              </button>
            </form>
          </div>
          {/* <!-- Product Input Form Ends --> */}
        </div>
      </div>
    </main>
  );
};
export default ProductContainer;
