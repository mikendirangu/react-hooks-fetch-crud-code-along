import React from "react";

function Item({ item, onDeleteItem, onToggleCart }) {
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>

      <button onClick={() => onToggleCart(item)}>
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>

      <button onClick={() => onDeleteItem(item.id)}>Delete</button>
    </li>
  );
}

export default Item;
