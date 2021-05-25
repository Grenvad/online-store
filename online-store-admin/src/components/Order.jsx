import React from "react";

function Order({
  id,
  address,
  phoneNumber,
  totalPrice,
  isDelivered,
  orderItems,
}) {
  return (
    <div className="order_item">
      <h3>id: {id}</h3>
      <ul>
        <li>адрес: {address}</li>
        <li>телефон: {phoneNumber}</li>
        <li>доставлено: {isDelivered}</li>
      </ul>
      <div>
        {orderItems.map((item, index) => (
          <span key={index}>
            1. {item.item.name} - {item.amount} шт.
          </span>
        ))}
      </div>
      <div>Итого: {totalPrice}</div>
    </div>
  );
}

export default Order;
