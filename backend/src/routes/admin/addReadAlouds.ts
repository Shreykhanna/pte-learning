import { Router } from "express";
import addReadAlouds from "../../controllers/admin/addReadAlouds";

const router = Router();
router.post("/", addReadAlouds);

export default router;
