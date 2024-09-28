const express = require("express");
const router = new express.Router();
const survey = require("../controllers/survey");
const {body} = require("express-validator")


router.post("/add-survey", 
    survey.saveRecord
)

router.get("/get-record", 
    survey.getRecord
)

module.exports = router;