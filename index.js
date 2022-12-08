const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

const app = express();
const cors = require("cors");
const routes = require("./src/routes/routes");

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`JavaScript with Express
  http://localhost:${process.env.PORT}/`);
});
