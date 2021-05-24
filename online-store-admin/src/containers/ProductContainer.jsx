import React from "react";
import Product from "../components/Product";

function ProductContainer({ items }) {
  return (
    <section>
      {items.length > 0 ? (
        items.map((item) => (
          <Product
            key={item.id}
            id={item.id}
            title={item.name}
            description={item.description}
            previewImg={item.previewImageUrl}
            price={item.price}
          />
        ))
      ) : (
        <span>в этой категории товаров ещё нет</span>
      )}
    </section>
  );
}

export default ProductContainer;
