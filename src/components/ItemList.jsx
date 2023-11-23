import React, { useState, useRef } from "react";

function ItemList({ shoppingList, onDeleteItem, onUpdateItem }) {
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentlyUpdating, setCurrentlyUpdatingItem] = useState({});

  const itemNameRef = useRef(null);
  const priceRef = useRef(null);
  const quantityRef = useRef(null);

  const handleUpdateItem = async () => {
    const updatedItem = {
      id: currentlyUpdating.id,
      name: itemNameRef.current.value,
      quantity: parseFloat(quantityRef.current.value),
      price: parseFloat(priceRef.current.value),
    };

    // Validate that quantity and price are positive numbers
    if (
      isNaN(updatedItem.quantity) ||
      updatedItem.quantity < 0 ||
      isNaN(updatedItem.price) ||
      updatedItem.price < 0
    ) {
      alert("Please enter valid positive numbers for quantity and price.");
      priceRef.current.value = priceRef.current.defaultValue;
      quantityRef.current.value = quantityRef.current.defaultValue;
      return;
    }

    await onUpdateItem(updatedItem);
    setIsUpdating(false);
  };

  if (shoppingList.length === 0) {
    return <div>No items in cart - add some!</div>;
  }

  return (
    <div>
      <h2> Shopping List </h2>
      <table className="table-simple">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shoppingList.map((item) => (
            <tr key={item.id}>
              {isUpdating && currentlyUpdating.id === item.id ? (
                <>
                  <td>{item.id}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Item name"
                      ref={itemNameRef}
                      defaultValue={currentlyUpdating.name}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Quantity"
                      defaultValue={currentlyUpdating.quantity}
                      ref={quantityRef}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Price"
                      defaultValue={currentlyUpdating.price}
                      ref={priceRef}
                    />
                  </td>
                  <td>
                    <button
                      onClick={async () => {
                        handleUpdateItem();
                        await onUpdateItem({
                          id: item.id,
                          name: itemNameRef.current.value,
                          quantity: quantityRef.current.value,
                          price: priceRef.current.value,
                        });
                        setIsUpdating(false);
                      }}>
                      Save
                    </button>
                    <button
                      onClick={() => {
                        onDeleteItem(item.id);
                        setIsUpdating(false);
                        setCurrentlyUpdatingItem(null);
                      }}>
                      Delete
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      className="buttons"
                      onClick={() => {
                        setIsUpdating(true);
                        setCurrentlyUpdatingItem(item);
                      }}>
                      Edit
                    </button>
                    <button
                      className="buttons"
                      onClick={() => onDeleteItem(item.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      Total cost of items:{" "}
      <b>
        {shoppingList.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )}{" "}
        DKK
      </b>
    </div>
  );
}

export default ItemList;
