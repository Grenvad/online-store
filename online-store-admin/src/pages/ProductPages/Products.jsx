import React from "react";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/products";
import {
  fetchCategories,
  setActiveCategory,
} from "../../redux/actions/categories";
import Categories from "../../components/Categories";
import ProductContainer from "../../containers/ProductContainer";

function Products() {
  const dispatch = useDispatch();
  const { categories, activeCategory } = useSelector(
    ({ categories }) => categories
  );
  const products = useSelector(({ products }) => products.items);

  const onSelectCategory = (id) => {
    dispatch(setActiveCategory(id));
  };

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchProducts(activeCategory));
  }, [activeCategory, dispatch]);

  return (
    <>
      <main>
      <div className="icon_wrap">
        <Link to="/product/add">
          <Button variant="primary">Добавить</Button>
        </Link>
      </div>
      <Categories
        activeCategory={activeCategory}
        items={categories}
        onClickCategory={onSelectCategory}
      />
      {products !== undefined ? <ProductContainer items={products} /> : <span>загрузка...</span>}
    </main>
    </>
  );
}

export default Products;
