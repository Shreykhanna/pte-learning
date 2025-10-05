import { Router } from "express";
import addRetellLecture from "../../controllers/admin/addRetellLecture";
const router = Router();
router.post("/", addRetellLecture);

export default router;
