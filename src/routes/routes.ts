import { Router } from "express";

const route: Router = Router();

route.get("/", async (req, res) => {
  res.json("funcionando");
});

export default route;
