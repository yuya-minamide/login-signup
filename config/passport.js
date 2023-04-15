import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import bcrypt from "bcryptjs";
import { User, GoogleUser, GitHubUser } from "../models/User.js";
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

// Google authentication
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/users/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			const newUser = {
				googleId: profile.id,
				displayName: profile.displayName,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				image: profile.photos[0].value,
			};

			try {
				let user = await GoogleUser.findOne({ googleId: profile.id });

				if (user) {
					done(null, user);
				} else {
					user = await GoogleUser.create(newUser);
					done(null, user);
				}
			} catch (err) {
				console.error(err);
			}
		}
	)
);

// Github authentication
passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: "/users/github/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			const newUser = {
				githubId: profile.id,
				displayName: profile.displayName,
				username: profile.username,
			};
			try {
				let user = await GitHubUser.findOne({ githubId: profile.id });
				if (user) {
					done(null, user);
				} else {
					user = await GitHubUser.create(newUser);
					done(null, user);
				}
			} catch (err) {
				console.error(err);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = (await User.findById(id)) || (await GoogleUser.findById(id)) || (await GitHubUser.findById(id));

		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

export { passport };
