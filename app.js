const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose=require("mongoose");


const path = require("path");
const app = express();



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("moongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

app.get("/", (req, res) => {
	const day = date.getDate();
	res.render("list", { listTitle: day, newListItems: items });
});
app.post("/", (req, res) => {
	const item = req.body.newItem;
	if (req.body.list === "Work") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");
	}
});

app.get("/work", (req, res) => {
	res.render("list", { listTitle: "Work List", newListItems: workItems });
});
app.post("/", (req, res) => {
	const item = req.body.newItem;
	workItems.push(item);
	res.redirect("/work");
});

app.listen("3000", (req, res) => {
	console.log("App is listen on port 3000");
});
