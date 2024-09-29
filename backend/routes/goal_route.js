const express = require("express");
const router = new express.Router();
const goal = require("../controllers/goal");
const {body} = require("express-validator")



router.post("/add-goal", 
    body("email").isEmail(), 
    body("goal").not().isEmpty().escape(),
    goal.setGoal
)


router.post("/get-goal", 
    body("email").isEmail(),
    goal.getGoal
)

module.exports = router;
