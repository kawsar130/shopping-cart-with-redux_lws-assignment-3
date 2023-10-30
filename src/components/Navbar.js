import Image from 'next/image';
import { useSelector } from 'react-redux';
import logo from '../../html/images/logo.png';

const Navbar = ({ handleActiveContainer }) => {
  const totalCartQty = useSelector((state) => state?.cart?.totalQty);
  console.log(totalCartQty);
  return (
    <nav className="bg-[#171C2A] py-4">
      <div className="navBar">
        <button onClick={() => handleActiveContainer('PRODUCT')}>
          <Image
            src={logo}
            width={100}
            height={50}
            alt="LWS"
            quality={75}
            priority="false"
            className="w-auto h-auto"
          />
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => handleActiveContainer('PRODUCT')}
            className="navHome"
            id="lws-home"
          >
            {' '}
            Home{' '}
          </button>
          <button
            onClick={() => handleActiveContainer('CART')}
            className="navCart"
            id="lws-cart"
          >
            <i className="text-xl fa-sharp fa-solid fa-bag-shopping"></i>
            <span id="lws-totalCart">{totalCartQty}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
