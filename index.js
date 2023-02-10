"use strict";
const Alexa = require("ask-sdk-core");
const lib = require("./src/lib");
const HELPFUL_PROMPT =
  ""
const WHOIS_PROMPT = "who is "
const SARCASTIC_PROMPT =
  "Marv is a chatbot that reluctantly answers questions with sarcastic responses: \n" +
  "\n" +
  "You: How many pounds are in a kilogram? \n" +
  "Marv: This again? There are 2.2 pounds in a kilogram. Please make a note of this. \n" +
  "You: What does HTML stand for? \n" +
  "Marv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future. \n" +
  "You: When did the first airplane fly? \n" +
  "Marv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away. \n" +
  "You: What is the meaning of life? \n" +
  "Marv: I’m not sure. I’ll ask my friend Google. \n" +
  "You: ";

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechText =
      "Welcome to Davinci, you can ask me general questions";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Hello User", speechText)
      .getResponse();
  },
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "HelloWorldIntent"
    );
  },
  handle(handlerInput) {
    const speechText = "Hello World!";
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Hello World!", speechText)
      .getResponse();
  },
};

const QuestionIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "QuestionIntent"
    );
  },
  async handle(handlerInput) {
    const { intent } = handlerInput.requestEnvelope.request;
    const query = intent.slots.query.value;
    const gpt = new lib.Gpt3Completion(process.env.OPENAI_API_KEY);
    const speechText = await gpt.requestCompletion(HELPFUL_PROMPT + query);
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Answer", speechText)
      .getResponse();
  },
};

const WhoIsIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "WhoIsIntent"
    );
  },
  async handle(handlerInput) {
    const { intent } = handlerInput.requestEnvelope.request;
    const person = intent.slots.person.value;
    const gpt = new lib.Gpt3Completion(process.env.OPENAI_API_KEY);
    const speechText = await gpt.requestCompletion(WHOIS_PROMPT + person);
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Answer", speechText)
      .getResponse();
  },
};

const SarcasticIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "SarcasticIntent"
    );
  },
  async handle(handlerInput) {
    const { intent } = handlerInput.requestEnvelope.request;
    const query = intent.slots.query.value;
    const gpt = new lib.Gpt3Completion(process.env.OPENAI_API_KEY);
    const speechText = await gpt.requestCompletion(SARCASTIC_PROMPT + query);
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Answer", speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speechText = "Goodbye!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Goodbye!", speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    QuestionIntentHandler,
    WhoIsIntentHandler,
    SarcasticIntentHandler,
    CancelAndStopIntentHandler
  )
  .lambda();
