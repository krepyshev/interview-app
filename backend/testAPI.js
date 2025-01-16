const axios = require("axios");

axios
  .post("http://localhost:4000/login", {
    username: "admin",
    password: "admin123",
  })
  .then((response) => console.log("Response:", response.data))
  .catch((error) =>
    console.error("Error:", error.response?.data || error.message)
  );
