const { validationResult } = require("express-validator");
const { dynamoDB } = require("../database/dynamodb")

const dotenv = require("dotenv");

dotenv.config();

const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2"})

const setGoal = async (req, res) => {
    const {email, goal} = req.body;

    const params = {
        TableName: "hack_the_hill_goal", 
        Item: {
            username: {S: email}, 
            goal: {S: goal}
        },
    };


    dynamoDB.putItem(params, (err, data) => {
        if (err) {
            return res.json({ message: "Error during add goal"})
        } else {
            return res.status(200).json({ message: "add successfully"})
        }
    })
}


const getGoal = async (req, res) => {
    const {email} = req.body;

    const params = {
        TableName: "hack_the_hill_goal", 
        Key: {
            username: {S: email}
        }
    }

    dynamoDB.getItem(params, (err, data) => {
        if (err) {
            return res.json({ message: "Error during the get goal"})
        } else {
            return res.status(200).json({ message: "success", data: data})
        }
    })
}



module.exports = {
    getGoal, 
    setGoal
}
