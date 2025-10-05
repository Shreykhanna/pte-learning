import { Router } from "express";
import retellLecture from "../controllers/retellLecture";

const router = Router();
router.get("/", retellLecture);

export default router;
