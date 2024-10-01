function generatePlanPrompt(request, behavior) {
    // Prepare the request for OpenAI GPT-4
    const prompt = `
    The user wants to break a bad habit. They provided the following context:
    what they want to break: ${request}
    Behavior questions and chosen answers: ${JSON.stringify(behavior)}
    Based on this, analyze the user's personality and skill set. Generate three tailored plans (Easy, Medium, Hard) for the user to choose from.
    
    Please return the plans in the following JSON format that includes an id, title, description, and plan details. The description should be a brief summary of the goal for each plan. Each plan should have goals, duration, weekly focus, topics, resources, and projects.
    
    Expected JSON format and this is just an example:
    [
      {
        "id": 1,
        "title": "Easy",
        "description": "A gradual and simple approach to break the habit over a longer period.",
        "planDetails": {
          "goal": "Quit smoking with gradual reduction over 8 weeks",
          "duration": "8 weeks",
          "weeks": [
            {
              "week": 1,
              "focus": "Understand Triggers and Set Goals",
              "topics": ["Identifying triggers", "Setting a quit date"],
              "resources": ["Quit Smoking Apps", "Support Group Websites"],
              "projects": ["Keep a smoking diary"]
            },
            ...
          ]
        }
    }]
    `;
    console.log(prompt)
    return prompt
}

function improvePlanPrompt(reflections) {
    const prompt = `
    The user has been working on breaking a bad habit. Here are their daily reflections:
    ${reflections.map((r, idx) => `Day ${idx + 1}: ${r}`).join('\n')}

    Based on these reflections, suggest how their plan can be improved. Provide more personalized and adaptive suggestions based on their self-reflections.

    Please return the plans in JSON format 
  `;

  return prompt;
}

module.exports = {
    generatePlanPrompt,
    improvePlanPrompt,
};
  