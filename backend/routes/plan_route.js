const express = require("express");
const router = new express.Router();
const plan = require("../controllers/plan")
const {body} = require("express-validator")


router.get("/get-plans", 
    body("email").isEmail(),
    body('request').not().isEmpty(), 
    plan.getPlans
)

router.post("/chosen-plan",
    body('email').isEmail(),
    body('plan').not().isEmpty(),
    body("request").not().isEmpty(),
    plan.chosenPlan
)

module.exports = router;

