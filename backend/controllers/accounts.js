const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecretkey, generate_salt} = require("../secret-data")
const { dynamoDB } = require("../database/dynamodb")
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.REGION})

const dotenv = require("dotenv");

dotenv.config();

const addAccount = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    } 

    const { email, password } = req.body;
    try {
        const salt = await generate_salt()
        const hashPassword = await bcrypt.hash(password, salt);

        // checking the user name is already exist in the table
        
    } catch(error) {

    }
}