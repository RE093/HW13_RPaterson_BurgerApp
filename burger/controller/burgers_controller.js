const express = require("express");
const router =  express.Router();
const burger = require("../models/burger.js");

// Get all data from orm database and render it to the index html
router.get("/index", function(req, res) {
    console.log("first route")
    burger.selectAll(function(data) {
        let hbsObject = {
            burger: data
        };
        res.render("index", hbsObject)
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [req.body.burger_name, req.body.devoured
    ], function(result) {
        res.json({ id: result.insertId});
    });
});

router.put("/api/burgers/:name", function(req, res) {
    let condition = "burger_name = " + req.params.name;
    console.log("condition", condition);

    burger.updateOne({
        devoured: true
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;