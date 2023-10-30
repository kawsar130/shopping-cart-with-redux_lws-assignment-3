'use client';

import { useState } from 'react';
import ProductContainer from '@/components/ProductContainer';
import CartContainer from '@/components/CartContainer';
import { Provider, useSelector } from 'react-redux';
import store from '@/redux/store';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [activeContainer, setActiveContainer] = useState('PRODUCT');

  const handleActiveContainer = (container) => setActiveContainer(container);

  return (
    <Provider store={store}>
      {/* Navbar */}
      <Navbar handleActiveContainer={handleActiveContainer} />

      {(() => {
        switch (activeContainer) {
          case 'PRODUCT':
            return <ProductContainer />;

          case 'CART':
            return <CartContainer />;

          default:
            return null;
        }
      })()}
    </Provider>
  );
}
