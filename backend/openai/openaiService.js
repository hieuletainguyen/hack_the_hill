// Import the OpenAI library
const { Configuration, OpenAIApi } = require('openai');

// Initialize the OpenAI client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Store your API key in environment variables
});

const openai = new OpenAIApi(configuration);

// Function to generate a tailored plan based on user input
async function generatePlan(request, behavior) {
  try {
    // Prepare the request for OpenAI GPT-4
    const prompt = `
      The user wants to break a bad habit. They provided the following context:
      Request: ${request}
      Behavior: ${JSON.stringify(behavior)}
      Based on this, analyze the user's personality and skill set. Generate a few tailored plans (easy, medium, hard) for the user to choose from.
      Please return the plans in JSON format with goals, duration, weekly focus, topics, resources, and projects for each plan.

      Example format:
      {
        "goal": "Learn JavaScript from basics to intermediate level in 2 months",
        "duration": "8 weeks",
        "weeks": [
          {
            "week": 1,
            "focus": "JavaScript Basics",
            "topics": ["..."],
            "resources": ["..."],
            "projects": ["..."]
          },
          ...
        ]
      }
    `;

    // Make the request to GPT-4
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that creates detailed plans for breaking habits.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 1500, // Adjust as needed
      temperature: 0.7,  // For creativity in plans
    });

    // Extract the response
    const plan = response.data.choices[0].message.content;
    return JSON.parse(plan);  // Convert the response to JSON

  } catch (error) {
    console.error('Error generating plan:', error);
    throw error;
  }
}

module.exports = {
  generatePlan,
};
