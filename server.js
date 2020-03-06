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
  var compatibilityGoal = 0;
  var compatibilityArray = [];

  // Sum of all values in an array
  const arrSum = arr => arr.reduce((a, b) => a + b, 0);

  // This function will check the new users compatibility based on question results
  function userCompatibility() {
    for (var i = 0; i < friendArray.length - 1; i++) {
      arrIndex = i;
      console.log(
        "Compability Function is currently being run on " +
          friendArray[arrIndex].name
      );
      differences(arrIndex);
    }
    // This block of code checks the total difference array for the person who has the closest diff to zero
    closest = compatibilityArray.reduce(function(prev, curr) {
      return Math.abs(curr - compatibilityGoal) <
        Math.abs(prev - compatibilityGoal)
        ? curr
        : prev;
    });

    console.log("The most compatible score is: " + closest);
    mostCompatible();
  }
  // Helper function that checks differences between user score and scores inside data array
  function differences(index) {
    let diffAnswer = [];
    for (var i = 0; i < userData.scores.length; i++) {
      let diffBoth = Math.abs(
        userData.scores[i] - friendArray[arrIndex].scores[i]
      );
      diffAnswer.push(diffBoth);
    }
    totalDifference = arrSum(diffAnswer);
    console.log(
      "Total Difference between " +
        userData.name +
        " & " +
        friendArray[arrIndex].name +
        " is: " +
        totalDifference
    );
    compatibilityArray.push(totalDifference);
  }
  // Function to find the most compatible user
  function mostCompatible() {
    for (var i = 0; i < compatibilityArray.length; i++) {
      if (closest === compatibilityArray[i]) {
        // Here the results were logged to get them on node terminal
        console.log("The most compatible score has an index of: " + i);
        console.log("The most compatible is: " + friendArray[i].name);
        console.log(
          "The most compatible has a picture of: " + friendArray[i].photo
        );
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        // Here the result is placed in a variable that is then sent back the client
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
