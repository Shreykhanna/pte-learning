import { Router } from "express";
import describeImage from "../controllers/describeImage";

const router = Router();
router.get("/", describeImage);
export default router;
