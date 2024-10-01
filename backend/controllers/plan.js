const { dynamoDB } = require("../database/dynamodb");
const { generatePlan, improvePlan } = require("../openai/openaiService");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2"})

const getPlans = async (req, res) => {
    const {email} = req.query;
    console.log(`Email: ${email}`)

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
        console.log('DATA SURVEY ================')
        console.log(data)
        
        const goalParams = {
            TableName: "hack_the_hill_goal", 
            Key: {
                username: {S: email}
            }
        }
        
        dynamoDB.getItem(goalParams, async (err1, data1) => {
            if (err1) {
                return res.status(400).json({message: "Error during get the goal for the plan"});
            }
            console.log("DATA1 =============================")
            console.log(data1);
            console.log("DATA================================")
            console.log(data);
            const result = await generatePlan(data1.Item.goal.S, data.Item)
            
            return res.json({message: "success", plans: result.plans});

        })
    })
}

const chosenPlan = async (req, res) => {
    const { email, title, description, planDetails } = req.body;
    
    const params = {
        TableName: "hack_the_hill_user_plan",
        Item: {
            username: { S: email },
            title: {S: title}, 
            description: {S: description},
            planDetails: {S: `${planDetails}`}
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