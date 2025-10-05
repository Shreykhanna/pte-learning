import { Router } from "express";
import readAloud from "../controllers/readAloud";

const router = Router();
router.get("/", readAloud);

export default router;
