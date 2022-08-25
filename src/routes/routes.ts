import { Router } from "express";
import { signIn, signUp } from "../controllers/users";
import { userTokenVerify } from "../middlewares/userTokenVerfify";

const route: Router = Router();

route.get("/", async (req, res) => {
  res.json("funcionando");
});
route.post("/signup", signUp);
route.post("/signin", signIn);

route.use("", userTokenVerify);

route.get("/teste", async (req, res) => {
  res.json("ok");
});

export default route;
