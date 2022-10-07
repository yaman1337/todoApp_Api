const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { SERVER_PORT, DB_URL } = require("./config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(require("./routes/auth"));
app.use(require("./routes/addTodo"));

mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    console.log(error);
  }
);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on ${SERVER_PORT}`);
});
