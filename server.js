// Dependencies
// ===========================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data
// ===========================================================
var all = [
  {
    route: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    route: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    route: "masterkenobi",
    name: "Master Kenobi",
    role: "Jedi Master",
    age: 600,
    forcePoints: 1500
  }
];

// Routes
// ===========================================================
app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/addchar", function(req, res) {
  res.sendFile(path.join(__dirname, "addchar.html"));
});

app.get("/characters/all", function(req, res) {
  return res.json(all);
});

app.get("/characters/all/:character", function(req, res) {
  var chosen = req.params.character;
  console.log(chosen);

  for (var i= 0; i < all.length; i++) {
    if (chosen === all[i].route) {
      return res.json(all[i]);
    }
  }
  return res.send("No character found");
});

// Create New Characters - takes in JSON input
app.post("/characters/all", function (req, res) {
  var newChar = req.body;

  newChar.route = newChar.name.replace(/\s+/g, "").toLowerCase();

  console.log(newChar);

  all.push(newChar);

  res.json(newChar);
});

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
