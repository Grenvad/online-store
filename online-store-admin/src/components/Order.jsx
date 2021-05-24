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
    <div>
      <h3>id: {id}</h3>
      <div>
        <span>адрес: {address}</span>
        <span>телефон: {phoneNumber}</span>
        <span>доставлено: {isDelivered}</span>
      </div>
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
