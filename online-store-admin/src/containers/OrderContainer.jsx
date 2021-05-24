import React from "react";
import Order from "../components/Order";

function OrderContainer({ items }) {
  return (
    <section>
      {items.length > 0 ? (
        items.map((item) => (
          <Order
            key={item.id}
            id={item.id}
            isCashPayment={item.isCashPayment}
            address={item.address}
            phoneNumber={item.clientPhoneNumber}
            totalPrice={item.totalPrice}
            isDelivered={item.isDelivered}
            orderItems={item.items}
          />
        ))
      ) : (
        <span>заказов пока нет</span>
      )}
    </section>
  );
}

export default OrderContainer;
