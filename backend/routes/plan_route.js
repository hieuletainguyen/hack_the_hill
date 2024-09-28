const express = require("express");
const router = new express.Router();
const plan = require("../controllers/plan")
const {query, body} = require("express-validator")


router.get("/get-plans", 
    query("email").isEmail(),
    query('request').not().isEmpty(), 
    plan.getPlans
)

router.post("/chosen-plan",
    body('email').isEmail(),
    body('plan').not().isEmpty(),
    body("request").not().isEmpty(),
    plan.chosenPlan
)

module.exports = router;

