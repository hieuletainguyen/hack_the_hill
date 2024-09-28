function generatePlanPrompt(request, behavior) {
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

    return prompt
}

module.exports = {
    generatePlanPrompt,
};
  