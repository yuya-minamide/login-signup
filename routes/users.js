import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Router } from "express";
import { User } from "../models/User.js";
import { forwardAuthenticated } from "../middleware/auth.js";
import passport from "passport";

dotenv.config();

export const router = Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));
router.get("/signup", forwardAuthenticated, (req, res) => res.render("signup"));

//Sign up Handle
router.post("/signup", (req, res) => {
	const { name, email, password, password2 } = req.body;
	const errors = [];
	if (!name || !email || !password || !password2) errors.push({ msg: "Please enter all your information!" });
	if (password !== password2) errors.push({ msg: "Passwords do not match!" });
	if (errors.length > 0) {
		res.render("signup", {
			errors,
			name,
			email,
			password,
			password2,
		});
	} else {
		User.findOne({ email: email }).then((user) => {
			if (user) {
				errors.push({ msg: "Email is already registered!" });
				res.render("signup", {
					errors,
					name,
					email,
					password,
					password2,
				});
			} else {
				const newUser = new User({
					name,
					email,
					password,
				});

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser
							.save()
							.then((user) => {
								req.flash("success_msg", "You can login right now!");
								res.redirect("/users/login");
							})
							.catch((err) => console.log(err));
					});
				});
			}
		});
	}
});

// Login Handle
router.post("/login", (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/home",
		failureRedirect: "/users/login",
		failureFlash: true,
	})(req, res, next);
});

// Logout Handle
router.get("/logout", (req, res) => {
	req.logout(() => {
		req.flash("success_msg", "You are logged out!");
		res.redirect("/users/login");
	});
});

// Google Login Handle
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
	res.redirect("/home");
});

// Github Logout Handle
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login" }), (req, res) => {
	res.redirect("/home");
});

// Twitter Logout Handle
router.get("/twitter", passport.authenticate("twitter"));
router.get("/twitter/callback", passport.authenticate("twitter", { failureRedirect: "/login" }), (req, res) => {
	res.redirect("/home");
});
