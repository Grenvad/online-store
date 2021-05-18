import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { Categories, ProductBlock, LoadingBlock } from "../components";

import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchProducts } from "../redux/actions/products";
import { addItemToCart } from "../redux/actions/cart";

const categoryNames = [
  { name: "Электроника", apiname: "electronics" },
  { name: "Бижутерия", apiname: "jewelery" },
  { name: "Мужская одежда", apiname: "men's clothing" },
  { name: "Женская одежда", apiname: "women's clothing" },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ products }) => products.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ products }) => products.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(fetchProducts(sortBy, category));
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const handleAddItemToCart = (item) => {
    dispatch(addItemToCart(item));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
      </div>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
              <ProductBlock
                key={obj.id}
                id={obj.id}
                name={obj.title}
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
