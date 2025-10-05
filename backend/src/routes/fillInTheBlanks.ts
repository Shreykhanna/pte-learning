import { Router } from "express";
import fillIntheBlanks from "../controllers/fillIntheBlanksController";
const router = Router();

router.get("/", fillIntheBlanks);

export default router;
