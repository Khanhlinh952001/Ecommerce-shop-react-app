import React, { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import useOrders from '../hooks/order/useOrders';
import { formatNumber } from '../utils/formatNumber';
import { ProductContext } from '../contexts/ProductContext';
import { getProductById } from '../utils/getProductById';
import OrderItem from '../components/OrderItem';
import { getShippingStatusStages } from '../utils/shippingUtils';
import Loading from '../components/Loading';
const OrderHistory = () => {
  const { user } = useAuth();
  const { products } = useContext(ProductContext);
  const { orders, loading, error } = useOrders(user ? user.id : null);
  console.log(orders)

  return (
    <div className="flex justify-center items-center min-h-screen lg:sm:py-20 sm:py-2 lg:md:mx-auto lg:md:container">
      <div className=" w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Order History</h1>
        {loading ? (
          <div className="text-center"><Loading/></div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error.message}</div>
        ) : orders.length > 0 ? (
          <ul>
            {orders.map((order) => (
              
              <li key={order.id}   className={`mb-4 border p-6 rounded shadow-md ${order.status === 'Cancelled' ? 'opacity-50 bg-gray-500' : ''}`}>
                <h1 className="text-blue-500 text-xl font-bold hover:underline">
                  Order ID: {order.orderId}
                </h1>
                <p><strong>Total:</strong> {formatNumber(order.total)}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Shipping Address:</strong> {order.shipping.shippingAddress}</p>
                <p><strong>Items:</strong></p>
                <ul>
                  {order.cart.map((item, idx) => {
                    const product = getProductById(products, item.id);
                    return product ? (<> <OrderItem key={idx} item={item} product={product} />

                    </>

                    ) : (
                      <li key={idx}>Product not found</li>
                    );
                  })}  <p className='mt-6'><strong>Shipping:</strong> {order.shipping.name} - {formatNumber(order.shipping.price)}</p>

                  <div className=' px-8'>


                    <p className="mt-2">
                      <strong>Shipping Status:</strong> {order.status}
                    </p>
                    <div className="mb-2 flex gap-2 mt-2">
                      {getShippingStatusStages(order.status).map((stage, idx) => (
                        <span
                          key={idx}
                          className={`mb-2 h-5 pl-4 flex-1 text-white rounded-xl text-sm ${stage.color} ${stage.isActive ? '' : 'opacity-10'}`}
                        > {stage.name}</span>
                      ))}
                    </div>  </div>
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
