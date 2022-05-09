import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { userRoutes } from "./users.routes";


const router = Router()


router.use("/users", userRoutes)
router.use(authenticateRoutes)


export { router }