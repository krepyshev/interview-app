const axios = require("axios");

const BASE_URL = "http://localhost:4000";

async function testRegister() {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      username: "testuser",
      password: "testpassword",
      role: "user",
    });
    console.log("Register Response:", response.data);
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
  }
}

async function testLogin() {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username: "testuser",
      password: "testpassword",
    });
    console.log("Login Response:", response.data);
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
  }
}

async function runTests() {
  console.log("Testing Register API...");
  await testRegister();
  console.log("\nTesting Login API...");
  await testLogin();
}

runTests();
