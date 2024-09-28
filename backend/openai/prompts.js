function generatePlanPrompt(request, behavior) {
    // Prepare the request for OpenAI GPT-4
    const prompt = `
    The user wants to break a bad habit. They provided the following context:
    Request: ${request}
    Behavior questions and chosen answers: ${JSON.stringify(behavior)}
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
  