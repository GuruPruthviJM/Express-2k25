import { Router } from "express";
import usersRouter from "./users.mjs"
import productsRouter from "./products.mjs"

const router = new Router();
router.use(usersRouter);
router.use(productsRouter);


export default router