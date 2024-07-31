import React from 'react';
import { formatNumber } from '../utils/formatNumber';

const OrderItem = ({ item, product }) => {
    console.log(product)
  return (
    <li className="mb-2 flex border p-4 rounded-xl shadow ">
      <img src={product.img[0].url} alt={product.name} className="w-20 h-22 cover object-cover mr-4" />
      <div>
        <p><strong>Product Name:</strong> {product.name}</p>
        <p><strong>Quantity:</strong> {item.quantity}</p>
        <p><strong>Price:</strong> {product.price}</p>
      </div>
    </li>
  );
};

export default OrderItem;
