function checkErrors(response) {
    const errorMessages = []

    // Check if the conversation was too long for the context window, resulting in incomplete JSON 
    if (response.choices[0].message.finish_reason === "length") {
        errorMessages.push("Conversation was too long for the context window, resulting in incomplete JSON ")
    }

    // Check if the OpenAI safety system refused the request and generated a refusal instead
    if (Array.isArray(response.choices[0].message) && response.choices[0].message[0].refusal) {
        errorMessages.push("OpenAI safety system refused the request and generated a refusal instead")
    }

    // Check if the model's output included restricted content, so the generation of JSON was halted and may be partial
    if (response.choices[0].message.finish_reason === "content_filter") {
        errorMessages.push("The model's output included restricted content, so the generation of JSON was halted and may be partial")
    }

    if (response.choices[0].message.finish_reason === "stop") {
        // In this case the model has either successfully finished generating the JSON object according to your schema, or the model generated one of the tokens you provided as a "stop token"
        errorMessages.push("The model has either successfully finished generating the JSON object according to your schema, or the model generated one of the tokens you provided as a \"stop token\"")
    }

    return errorMessages;
}

module.exports = {
    checkErrors,
};