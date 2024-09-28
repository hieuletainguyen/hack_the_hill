const express = require("express");
const AWS = require("aws-sdk");
const { dynamoDB } = require("../database/dynamodb");
const dotenv = require("dotenv");

dotenv.config()

AWS.config.update({ region: process.env.REGION })

const saveRecord = async (req, res) => {
       
}