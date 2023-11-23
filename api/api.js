import axios from "axios";

const API_URL = "http://127.0.0.1:3000/api/";

export async function getItems() {
    const response = await axios.get(`${API_URL}`);
    return await response.data;
}

export async function getItem(id) {
  const response = await axios.get(`${API_URL}?id=${id}`);
  return await response.data;
}

export async function createItem(shoppingList, item) {
  if (shoppingList.length === 0) {
    item.id = 0;
  } else {
    item.id = shoppingList[shoppingList.length - 1].id + 1;
  }
  if ((await item.id) != null) {
    const response = await axios.post(`${API_URL}`, item, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.data;
  }
}

export async function updateItem(item) {
  const responseCheck = await axios.get(`${API_URL}?id=${item.id}`);
  if (responseCheck.data.length === 0) {
    return null;
  } else {
    const response = await axios.put(`${API_URL}${item.id}`, item, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.data;
  }
}

export async function deleteItem(id) {
  const responseCheck = await axios.get(`${API_URL}?id=${id}`);
  if ((await responseCheck.data.length) === 0) {
    return null;
  } else {
    const response = await axios.delete(`${API_URL}${id}`);
    return await response.data;
  }
}
