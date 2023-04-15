const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on ${PORT}`));
