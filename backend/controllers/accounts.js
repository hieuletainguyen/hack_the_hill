const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecretkey, generate_salt} = require("../secret-data")
const { dynamoDB } = require("../database/dynamodb")

const dotenv = require("dotenv");

dotenv.config();

const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2"})


const addAccount = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    } 

    const { email, password } = req.body;
    try {
        const params = {
            TableName: "hack_the_hill_accounts",
            Key: {
                name: {S: email}
            }
        }
        
        dynamoDB.getItem(params, async (err, data) => {
            if (err) {
                console.log("Error", err)
            } 

            const salt = await generate_salt()
            const hashPassword = await bcrypt.hash(password, salt);

            var addingParams = {
                TableName: "hack_the_hill_accounts",
                Item: {
                    name: { S: email },
                    password: {S: hashPassword}
                },
            };

            dynamoDB.putItem(addingParams, (err, data) => {
                if (err) {
                    return res.json({message: "Error during adding"})
                } else {
                    return res.status(200).json({ message: "add succesfully"})
                }
            })
            
        })
        
    } catch(error) {
        res.json({message: "Error during adding"})
    }
}

const authorization = async (req, res) => {
    const { email, password } = req.body;

    const params = {
        TableName: "hack_the_hill_accounts",
        Key: {
            name: { S: email}
        }, 
        
    };

    dynamoDB.getItem(params, async (err, data) => {
        if (err) {
            return res.json({message: err});
        } 

        if (Object.keys(data).length === 0) {
            return res.status(401).json({message: "Invalid email or password"})
        }
        const hashedPassword = data.Item.password.S;
        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {
            const token = jwt.sign({email: email}, jwtSecretkey, {expiresIn: "1h"});
            
            var addingParams = {
                TableName: "hack_the_hill_tokens",
                Item: {
                    token: { S: token },
                    email: {S: email}
                },
            };

            dynamoDB.putItem(addingParams, (err, data) => {
                if (err) {
                    return res.json({message: "Error during adding"})
                } else {
                    return res.status(200).json({ message: "add succesfully"})
                }
            })
            return res.status(200).json({message: "success", token: token})
        } else {
            return res.status(401).json({message: "Invalid email or password"})
        }

    })
    
}

const logout = (req, res) => {
    const {token} = req.body;

    console.log(token)

    if (token){
        const params = {
            TableName: "hack_the_hill_tokens",
            Key: {
                token: {S: token}
            }
        };

        dynamoDB.deleteItem(params, (err, data) => {
            if (err) {
                return res.status(400).json({message: err})
            }
            res.clearCookie("TOKENS");
            return res.status(200).json({message: "success"})
        })
    }
}

const decode_token = (req, res) => {
    const {token} = req.body;

    if (token) {
        jwt.verify(token, jwtSecretkey, (err, decoded) => {
            if (err) {
                return res.status(401).json({message: "Invalid token"})
            } 

            const params = {
                TableName: "hack_the_hill_tokens",
                Key: {
                    token: { S: token}
                }, 
                ProjectionExpression: "email"
            }

            dynamoDB.getItem(params, async (err, data) => {
                if (err) {
                    return res.json({message: err});
                } 

                if (Object.keys(data).length === 1) {
                    return res.status(200).json({ message: "success", email: decoded.email })
                } else {
                    return res.status(401).json({ message: "Invalid token"})
                }
            })
        })
    }
}


module.exports = {
    addAccount, 
    authorization, 
    logout, 
    decode_token
}

