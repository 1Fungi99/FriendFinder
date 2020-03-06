// Dependencies
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ v
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ^

// Getting the data
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ v
const friendArray = require("./app/data/friends.js");
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ^

//Routing that didn't work
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ v
// require("./app/routes/htmlRoutes.js");
// require("./app/routes/apiRoutes.js");
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ^

// HTML Routes
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ v
app.get("/", function(req, res) {
  res.sendFile("./app/public/home.html", {
    root: path.join(__dirname, "./")
  });
});

app.get("/survey", function(req, res) {
  res.sendFile("./app/public/survey.html", {
    root: path.join(__dirname, "./")
  });
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ^

// API routes
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ v
app.get("/api/friends", function(req, res) {
  res.json(friendArray);
});
app.post("/api/friends", function(req, res) {
  var userData = req.body;
  console.log(userData);

  friendArray.push(userData);

  //Global variable
  var goal = 0;
  var compArray = [];

  // Sum of all values in an array
  const arrSum = arr => arr.reduce((a, b) => a + b, 0);

  function userCompatibility() {
    for (var i = 0; i < friendArray.length - 1; i++) {
      arrIndex = i;
      console.log(
        "Compability Function is currently being run on " +
          friendArray[arrIndex].name
      );
      differences(arrIndex);
    }

    closest = compArray.reduce(function(prev, curr) {
      return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    });

    console.log("The most compatible score is: " + closest);
    mostCompatible();
  }

  function differences(index) {
    let diffAnswer = [];
    for (var i = 0; i < userData.scores.length; i++) {
      let diffBoth = Math.abs(
        userData.scores[i] - friendArray[arrIndex].scores[i]
      );
      diffAnswer.push(diffBoth);
    }
    fDifference = arrSum(diffAnswer);
    console.log(
      "Total Difference between " +
        userData.name +
        " & " +
        friendArray[arrIndex].name +
        " is: " +
        fDifference
    );
    compArray.push(fDifference);
  }

  function mostCompatible() {
    for (var i = 0; i < compArray.length; i++) {
      if (closest === compArray[i]) {
        console.log("Best compatability index: " + i);
        console.log("The most compatible is: " + friendArray[i].name);
        console.log("src for best compatible: " + friendArray[i].photo);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        var matched = friendArray[i];
        console.log(matched);
        return res.send(matched);
      }
    }
  }

  // Function calls
  userCompatibility();
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ^

app.listen(PORT, function() {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

module.exports = app;
