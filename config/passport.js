import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Local authentication
passport.use(
	new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
		User.findOne({ email: email })
			.then((user) => {
				if (!user)
					return done(null, false, {
						message: "That email is not registered!",
					});

				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err;
					return isMatch ? done(null, user) : done(null, false, { message: "Password incorrect!" });
				});
			})
			.catch((err) => console.log(err));
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

export { passport };
