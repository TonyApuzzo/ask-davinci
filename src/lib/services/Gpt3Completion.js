const axios = require("axios");

class Gpt3Completion {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = "https://api.openai.com/v1/completions";
  }

  async requestCompletion(prompt) {
    const response = await axios.post(
      this.apiUrl,
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 150,
        n: 1,
        stop: "",
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );

    return response.data.choices[0].text;
  }
}

module.exports = Gpt3Completion;
