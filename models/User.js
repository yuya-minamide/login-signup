import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const GoogleUserSchema = new Schema({
	googleId: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const GithubSchema = new Schema({
	githubId: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = model("User", UserSchema);
const GoogleUser = model("GoogleUser", GoogleUserSchema);
const GitHubUser = model("GitHubUser", GithubSchema);

export { User, GoogleUser, GitHubUser };
