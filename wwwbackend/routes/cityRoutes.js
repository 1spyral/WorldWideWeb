import express from "express";

import cityController from "../controllers/cityController.js";

const cityRoutes = express.Router();

cityRoutes.get("/", cityController.get);

cityRoutes.delete("/", cityController.generate);

cityRoutes.post("/", cityController.grow);

export default cityRoutes;