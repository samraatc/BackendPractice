import { Router } from "express";
import { registerUser } from "../coltrolers/user.controler.js";


const router = Router();
router.route("/register").post(registerUser)



export default router;

