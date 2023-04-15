const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");

// Welcome Page
router.get("/", (req, res) => res.render("top"));

// Dashboard
router.get("/home", ensureAuthenticated, (req, res) =>
	res.render("home", {
		name: req.user.name,
	})
);

module.exports = router;
