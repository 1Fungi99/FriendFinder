const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

require("./app/routes/htmlRoutes.js");
require("./app/routes/apiRoutes.js");

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

app.listen(PORT, function() {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

module.exports = app;
