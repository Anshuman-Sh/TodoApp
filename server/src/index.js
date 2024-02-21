const app = require("./app");
const mongoose = require("mongoose");
const PORT = 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/todos")
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
