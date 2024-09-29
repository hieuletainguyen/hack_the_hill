const express = require("express");
const router = new express.Router();
const plan = require("../controllers/plan")
const {query, body} = require("express-validator")


router.get("/get-plans", 
    query("email").isEmail(),
    plan.getPlans
)

router.post("/chosen-plan",
    body('email').isEmail(),
    plan.chosenPlan
)

module.exports = router;

