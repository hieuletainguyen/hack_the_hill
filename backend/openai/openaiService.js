
const OpenAI = require('openai')
const dotenv = require("dotenv");
const PromptGenerator = require("./prompts")
const ErrorHandler = require("./errorHandler")

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate a tailored plan based on user input
async function generatePlan(request, behavior) {
  try {
    let prompt = PromptGenerator.generatePlanPrompt(request, behavior)

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that creates detailed plans for breaking bad habits.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: {
        type: 'json_object',
      },
    });

    const errorMessages = ErrorHandler.checkErrors(response);

    if (errorMessages.length > 0) {
     return; 
    }

    // Extract the response
    const planString = response.choices[0].message.content;
  
    
    // Parse the cleaned string as JSON
    const parsedPlan = JSON.parse(planString);

    // Use the parsed JSON object
    console.log(parsedPlan);

    return parsedPlan;

  } catch (error) {
    console.error('Error generating plan:', error);
    throw error;
  }
}

// Function to generate a refined plan based on user reflections
async function improvePlan(reflections) {
  const prompt = PromptGenerator.improvePlanPrompt(reflections)

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a coach helping a user to break a bad habit through daily plans and reflections.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: {
      type: 'json_object',
    },
  });

  const errorMessages = ErrorHandler.checkErrors(response);

  if (errorMessages.length > 0) {
   return; 
  }

  // Extract the response
  const planString = response.choices[0].message.content;

  // Parse the cleaned string as JSON
  const parsedPlan = JSON.parse(planString);

  // Use the parsed JSON object
  console.log(parsedPlan);

  return parsedPlan;
}

module.exports = {
  generatePlan,
  improvePlan
};
