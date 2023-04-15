import { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth.js";

export const router = Router();

router.get("/", (req, res) => res.render("top"));
router.get("/home", ensureAuthenticated, (req, res) =>
	res.render("home", {
		name: req.user.name ? req.user.name : req.user.displayName,
	})
);
