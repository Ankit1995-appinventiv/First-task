const { Parser } = require("json2csv");
const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
var csv;
let myCars = {};
app.post("/", (req, res) => {
  console.log(req.body);
  myCars = req.body;
  res.send(req.body);

  last(myCars);
});

function last(myCars) {
  console.log(myCars.name);
  var fields = [
    "userDetails.userId",
    "userDetails.firstName",
    "userDetails.lastName",
    "userDetails.address",
    "userDetails.pincode",
    "userDetails.mobile"
  ];

  var parser = new Parser({
    fields,
    unwind: [
      "userDetails.userId",
      "userDetails.firstName",
      "userDetails.lastName",
      "userDetails.address",
      "userDetails.pincode",
      "userDetails.mobile"
    ]
  });

  csv = parser.parse(myCars);
  fs.writeFile("./test-data.csv", csv, err => {
    if (err) {
      console.log(err); // Do something to handle the error or just throw it
      throw new Error(err);
    }
    console.log("Success!");
  });
}

app.listen("7000", () => {
  console.log("started");
});
