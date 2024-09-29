const express = require("express");
const AWS = require("aws-sdk");
const { dynamoDB } = require("../database/dynamodb");
const dotenv = require("dotenv");

dotenv.config()

AWS.config.update({ region: process.env.REGION })

const saveRecord = async (req, res) => {
    const {username, answer1, answer2, answer3, answer4, answer5, answer6 } = req.body;

    const params = {
        TableName: "hack_the_hill_survey",
        Item: {
            username: {S: username},
            "How do you typically approach problem-solving or decision-making in your daily life or work?": {S: answer1},
            "When encountering a new technology or tool, how do you prefer to learn about it—through hands-on experience, reading, or tutorials?": {S: answer2},
            "What motivates you to engage with or return to a product or service consistently?": {S: answer3},
            "How do you handle feedback, both positive and negative, in personal or professional settings?": {S: answer4},
            "What role does routine play in your life—do you prefer structured schedules or a more flexible approach to tasks?": {S: answer5},
            "How do you balance creativity with practicality when working on projects or making choices?": {S: answer6}
        },
    }

    dynamoDB.putItem(params, (err, data) => {
        if (err) {
            return res.json({message: "Error during adding survey", error: err})
        } else {
            return res.status(200).json({ message: "add succesfully", data: data})
        }
    })

}


const getRecord = async (req, res) => {
    const {username} = req.token;

    const params = {
        TableName: "hack_the_hill_survey",
        Key: {
            username: {S: username}
        },
    }

    dynamoDB.getItem(params, (err, data) => {
        if (err) {
            return res.json({message: "Error during adding survey"})
        } else {
            return res.status(200).json({ message: "success", data: data})
        }
    })
}

module.exports = {
    saveRecord, 
    getRecord
}