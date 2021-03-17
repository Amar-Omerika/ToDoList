const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const path = require("path");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const itemsSchema = {
	name: String,
};
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
	name: "Welcome to your todolist.",
});
const item2 = new Item({
	name: "Hit the + button to aff a new item.",
});
const item3 = new Item({
	name: "<-- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];

//Item.insertMany(defaultItems, function (err) {
//	if (err) {
//	console.log(err);
//} else {
//	console.log("Successfully connected to database");
//	}
//});

app.get("/", (req, res) => {
	Item.find({}, function (err, foundItems) {
		res.render("list", { listTitle: "Today", newListItems: foundItems });
	});
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
