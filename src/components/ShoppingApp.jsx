import ShoppingInput from "./ShoppingInput";
import ItemList from "./ItemList";
import { useEffect, useState } from "react";
import { getItems, updateItem, deleteItem } from "/api/api.js";

function ShoppingApp() {
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  async function fetchItems() {
    const items = await getItems();
    setShoppingList(await items);
  }

  // Function to check if items are fetched (if JSONServer is running)
  async function fetchData() {
    try {
      console.log("Fetching items...");
      setLoading(true);
      setFetchError(null);
      const items = await getItems();
      console.log("Items fetched:", items);
      setShoppingList(items);
    } catch (error) {
      console.error("Error fetching items:", error);
      setFetchError(error.message || "An error occurred while fetching items");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function onDeleteItem(id) {
    await deleteItem(id);
    fetchItems();
  }

  async function onUpdateItem(item) {
    await updateItem(item);
    fetchItems();
  }

  return (
    <div>
      {loading ? (
        <p>Waiting for JSON response...</p>
      ) : fetchError ? (
        <p>Error: {fetchError}</p>
      ) : (
        <>
          <ItemList
            shoppingList={shoppingList}
            setShoppingList={setShoppingList}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
          <ShoppingInput
            shoppingList={shoppingList}
            setShoppingList={setShoppingList}
          />
        </>
      )}
    </div>
  );
}

export default ShoppingApp;
