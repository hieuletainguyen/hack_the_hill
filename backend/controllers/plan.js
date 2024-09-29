const { dynamoDB } = require("../database/dynamodb");
const { generatePlan, improvePlan } = require("../openai/openaiService");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2"})

const getPlans = async (req, res) => {
    const {email} = req.query;

    const params = {
        TableName: "hack_the_hill_survey",
        Key: {
            username: {S: email}
        }
    };

    dynamoDB.getItem(params, (err, data) => {
        if (err) {
            return res.status(400).json({message: "Error during query the survey"});
        }
        
        const goalParams = {
            TableName: "hack_the_hill_goal", 
            Key: {
                username: {S: email}
            }
        }
        
        dynamoDB.getItem(goalParams, (err1, data1) => {
            if (err1) {
                return res.status(400).json({message: "Error during get the goal for the plan"});
            }
            const result = generatePlan(data1.Item.S, data.Item)
            return res.json({message: "success", result: result});

        })
    })
}

const chosenPlan = async (req, res) => {
    const { email, plan, description } = req.body;
    
    const params = {
        TableName: "hack_the_hill_user_plan",
        Item: {
            username: { S: email },
            description: {S: description}, 
            plan: {S: plan}
        },
    }

    dynamoDB.putItem(params, (err, data) => {
        if (err) {
            return res.json({ mesasge: "Error during adding plan"})
        } else {
            return res.status(200).json({ message: "add successfully"})
        }
    })
}



module.exports = {
    getPlans,
    chosenPlan

}