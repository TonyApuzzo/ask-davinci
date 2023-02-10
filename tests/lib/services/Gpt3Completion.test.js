const Gpt3Completion = require("../../../src/lib/services/Gpt3Completion.js");
require("dotenv").config();

describe("GPT3Completion", () => {
  it("should request a completion", async () => {
    const gpt3 = new Gpt3Completion(process.env.OPENAI_API_KEY);
    const completion = await gpt3.requestCompletion(
      "The quick brown fox jumps over the"
    );
    console.log('completion: %o', completion);
    expect(completion).toBeDefined();
    expect(completion).toContain("lazy dog")
  });

  it("should answer questions", async () => {
    const gpt3 = new Gpt3Completion(process.env.OPENAI_API_KEY);
    const completion = await gpt3.requestCompletion(
      "a poem about bats:\n"
    );
    console.log('completion: %o', completion);
    expect(completion).toBeDefined();
  });

});
