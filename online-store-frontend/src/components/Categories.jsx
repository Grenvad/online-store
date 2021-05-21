import React from "react";

function Categories({ activeCategory, items, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        {items &&
          items.map((item, index) => (
            <li
              className={activeCategory === item.id ? "active" : ""}
              onClick={() => onClickCategory(item.id)}
              key={`${item}_${index}`}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Categories;
