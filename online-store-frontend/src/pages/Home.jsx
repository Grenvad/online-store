import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { Categories, ProductBlock, LoadingBlock } from "../components";

import {
  fetchCategories,
  setActiveCategory,
} from "../redux/actions/categories";
import { fetchProducts } from "../redux/actions/products";
import { addItemToCart } from "../redux/actions/cart";

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ products }) => products.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ products }) => products.isLoaded);
  const { categories, activeCategory } = useSelector(
    ({ categories }) => categories
  );

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchProducts(activeCategory));
  }, [activeCategory]);

  const onSelectCategory = React.useCallback((id) => {
    dispatch(setActiveCategory(id));
  }, []);

  const handleAddItemToCart = (item) => {
    dispatch(addItemToCart(item));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          onClickCategory={onSelectCategory}
          items={categories}
        />
      </div>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
              <ProductBlock
                key={obj.id}
                id={obj.id}
                name={obj.name}
                imageUrl={obj.image}
                price={obj.price}
                description={obj.description}
                onClickAdd={handleAddItemToCart}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <LoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
