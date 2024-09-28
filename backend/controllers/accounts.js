const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecretkey, generate_salt} = require("../secret-data")
const { dynamoDB } = require("../database/dynamodb")

const dotenv = require("dotenv");

dotenv.config();

const AWS = require("aws-sdk");

AWS.config.update({ region: process.env.REGION})


const addAccount = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    } 

    const { email, password } = req.body;
    try {
        const params = {
            TableName: process.env.TABLE_SURVEY,
            Key: {
                name: email
            }
        }

        const checkIfExists = async () => {
            try {
              const data = await dynamoDB.get(params).promise();
              
              if (data.Item) {
                console.log('Item exists:', data.Item);
                return true;
              } else {
                console.log('Item does not exist.');
                return false;
              }
            } catch (error) {
              console.error('Error querying DynamoDB:', error);
              return false;
            }
        };
        
        if (!checkIfExists) {
            const salt = await generate_salt()
            const hashPassword = await bcrypt.hash(password, salt);

            var addingParams = {
                TableName: process.env.TABLE_SURVEY,
                Item: {
                    name: { S: email },
                    password: {S: hashPassword}
                },
            };

            dynamoDB.putItem(addingParams, (err, data) => {
                if (err) {
                    res.json({message: err})
                } else {
                    res.status(200).json({ message: data})
                }
            })

        }
        
    } catch(error) {

    }
}

const authorization = async (req, res) => {
    const { email, password } = req.body;

    const params = {
        TableName: process.env.TABLE_SURVEY,
        Key: {
            KEY_NAME: { S: email}
        }, 
        ProjectionExpression: "password"
    };

    dynamoDB.getItem(params, async (err, data) => {
        if (err) {
            res.json({message: err});
        } else {
            if (data.length === 0) {
                return res.status(401).json({message: "Invalid email or password"})
            } else {
                const hashedPassword = data.Item.password;
                const match = await bcrypt.compare(password, hashedPassword);

                if (match) {
                    const token = jwt.sign({email: email}, jwtSecretkey, {expiresIn: "1h"});
                    res.cookie("TOKENS", token)
                    return res.status(200).json({ message: "success"})
                } else {
                    return res.status(401).json({message: "Invalid email or password"})
                }


            }
        }
    })
    
}

const logout = (req, res) => {
    res.clearCookie("TOKENS");
    res.status(200).json({message: "Logged out successfully"})
}


module.exports = {
    addAccount, 
    authorization, 
    logout
}

