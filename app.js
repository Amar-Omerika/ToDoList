const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const path = require("path");
const { strict } = require("assert");
const { DEFAULT_MIN_VERSION } = require("tls");
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
	name: "Hit the + button to add a new item.",
});
const item3 = new Item({
	name: "<-- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
	name: String,
	items: [itemsSchema],
};
const List = mongoose.model("List", listSchema);

app.get("/", (req, res) => {
	Item.find({}, function (err, foundItems) {
		//gives as back  array as a result
		if (foundItems.length === 0) {
			Item.insertMany(defaultItems, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Successfully connected to database");
				}
			});
			res.redirect("/");
		} else {
			res.render("list", { listTitle: "Today", newListItems: foundItems });
		}
	});
});

app.post("/", (req, res) => {
	const itemName = req.body.newItem;
	const item = new Item({
		name: itemName,
	});
	item.save();
	res.redirect("/");
});
app.post("/delete", (req, res) => {
	const checkedItemId = req.body.checkbox;
	Item.findByIdAndRemove(checkedItemId, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Successfully removed an element");
			res.redirect("/");
		}
	});
});

app.get("/:customListName", function (req, res) {
	const customListName = req.params.customListName;
	List.findOne({ name: customListName }, function (err, foundList) {
		//getting object back
		if (!err) {
			if (!foundList) {
				console.log("Doesn't exist!");
			} else {
				console.log("Exists");
			}
		}
	});

	const list = new List({
		name: customListName,
		items: defaultItems,
	});
	list.save();
});

app.listen("3000", (req, res) => {
	console.log("App is listen on port 3000");
});
