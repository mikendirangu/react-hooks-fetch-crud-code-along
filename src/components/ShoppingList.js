import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Item from "./Item";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((data) => setItems(data));
  }, []);

  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function handleDeleteItem(id) {
    fetch(`http://localhost:4000/items/${id}`, {
      method: "DELETE",
    }).then(() => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    });
  }

  // ✅ Fix toggle: make sure state updates correctly
  function handleToggleCart(itemToUpdate) {
    const updated = { ...itemToUpdate, isInCart: !itemToUpdate.isInCart };

    fetch(`http://localhost:4000/items/${itemToUpdate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isInCart: updated.isInCart }),
    })
      .then((r) => r.json())
      .then((newItem) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === newItem.id ? newItem : item
          )
        );
      });
  }

  const itemsToDisplay = items.filter(
    (item) => filter === "All" || item.category === filter
  );

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />

      <div className="Filter">
        <select
          name="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">Filter by category</option>
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>

      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={handleDeleteItem}
            onToggleCart={handleToggleCart}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
