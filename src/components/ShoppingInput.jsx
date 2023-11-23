import { useRef } from "react";
import { createItem } from "/api/api.js";

function ShoppingInput({ shoppingList, setShoppingList }) {
  const itemRef = useRef(null);
  const priceRef = useRef(null);
  const quantityRef = useRef(null);

  // Add item to cart (Create)
  const addToCart = async () => {
    const newItem = {
      name: itemRef.current.value,
      price: parseFloat(priceRef.current.value),
      quantity: parseInt(quantityRef.current.value),
    };

    const addedItem = await createItem(shoppingList, newItem);

    if (addedItem) {
      setShoppingList([...shoppingList, addedItem]);
    }

    // Clears input fields for new items
    itemRef.current.value = "";
    priceRef.current.value = "";
    quantityRef.current.value = "";
  };

  return (
    <div>
      <input type="text" placeholder="Item Name" ref={itemRef} />
        <input type="number" placeholder="Price" ref={priceRef} />
        <input type="number" placeholder="Quantity" ref={quantityRef} />
      <div>
        <button className="buttons" onClick={addToCart}>
          Add to list
        </button>
      </div>
    </div>
  );
}

export default ShoppingInput;
