import { connectDB } from "./config/db.js";
import { passport } from "./config/passport.js";
import flash from "connect-flash";
import dotenv from "dotenv";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";

const app = express();

dotenv.config();

connectDB();

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	next();
});

(async () => {
	const indexRouter = (await import("./routes/index.js")).router;
	const usersRouter = (await import("./routes/users.js")).router;

	app.use("/", indexRouter);
	app.use("/users", usersRouter);

	const PORT = process.env.PORT || 3000;

	app.listen(PORT, console.log(`Server running on  ${PORT}`));
})();
