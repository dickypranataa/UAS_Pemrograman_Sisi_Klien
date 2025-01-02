import axios from "axios";

const API_URL = "http://localhost/merapi-app/backend/"; // URL backend kamu

// Login API
export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "login.php", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error: ", error);
    throw error;
  }
};

// Register API
export const register = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "register.php", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Register error: ", error);
    throw error;
  }
};

// Get Disasters API
export const getDisasters = async () => {
  try {
    const response = await axios.get(API_URL + "disasters.php");
    return response.data;
  } catch (error) {
    console.error("Get disasters error: ", error);
    throw error;
  }
};

// Add Disaster API
export const addDisaster = async (name, description) => {
  try {
    const response = await axios.post(API_URL + "disasters.php", {
      name,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Add disaster error: ", error);
    throw error;
  }
};

// Delete Disaster API
export const deleteDisaster = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}disasters.php?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete disaster error: ", error);
    throw error;
  }
};
