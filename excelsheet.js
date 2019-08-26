const { Parser } = require("json2csv");
const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
let csv;
let db = [];
let myCars = {};
let idCount = 1;

app.post(
  "/",
  (req, res, next) => {
    myCars = req.body;
    myCars.userDetails.userId = idCount;
    ++idCount;
    db.push(myCars);
    res.send(req.body);
    console.log(db);
    next();
    //last(db);
  },
  () => {
    let fields = [
      "userDetails.userId",
      "userDetails.firstName",
      "userDetails.lastName",
      "userDetails.address",
      "userDetails.pincode",
      "userDetails.mobile"
    ];
    console.log("has to be exceuted last");
    let parser = new Parser({
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

    csv = parser.parse(db);
    fs.writeFile("./test-data.csv", csv, err => {
      if (err) {
        console.log(err); // Do something to handle the error or just throw it
        throw new Error(err);
      }
      console.log("Success!");
    });
  }
);

// function last(myCars) {
//   let fields = [
//     "userDetails.userId",
//     "userDetails.firstName",
//     "userDetails.lastName",
//     "userDetails.address",
//     "userDetails.pincode",
//     "userDetails.mobile"
//   ];

//   let parser = new Parser({
//     fields,
//     unwind: [
//       "userDetails.userId",
//       "userDetails.firstName",
//       "userDetails.lastName",
//       "userDetails.address",
//       "userDetails.pincode",
//       "userDetails.mobile"
//     ]
//   });

//   csv = parser.parse(myCars);
//   fs.writeFile("./test-data.csv", csv, err => {
//     if (err) {
//       console.log(err); // Do something to handle the error or just throw it
//       throw new Error(err);
//     }
//     console.log("Success!");
//   });
// }

app.listen("7000", () => {
  console.log("started");
});
