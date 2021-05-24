import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/actions/orders";
import OrderContainer from "../../containers/OrderContainer";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector(({ orders }) => orders.items);

  React.useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <main>
      {orders !== undefined ? (
        <OrderContainer items={orders} />
      ) : (
        <span>загрузка...</span>
      )}
    </main>
  );
}

export default Orders;
