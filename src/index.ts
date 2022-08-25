import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routes";

dotenv.config({ path: "./env/.env" });

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`TypeScript with Express
  http://localhost:${8000}/`);
});
