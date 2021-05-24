import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/actions/products";

function Product({ id, title, description, imageUrl, price }) {
  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(deleteProduct(id));
  }
  return (
    <div>
      <img src={imageUrl} alt="товар" />
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{price}</span>
      <div>
        <Link to={`/product/edit/${id}`}>
          <i className="fas fa-edit"></i>
        </Link>

        <i onClick={() => handleDelete(id)} className="fas fa-times"></i>
      </div>
    </div>
  );
}

export default Product;
