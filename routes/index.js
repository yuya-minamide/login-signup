const express = require("express");
const router = express.Router();

// Welcome Page
router.get("/", (req, res) => res.render("top"));

// Dashboard
router.get("/home", (req, res) =>
	res.render("home", {
		name: req.user.name,
	})
);

module.exports = router;
