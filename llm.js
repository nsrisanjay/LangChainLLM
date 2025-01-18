import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq";
import 'dotenv/config';

const model = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model: "mixtral-8x7b-32768",
    temperature: 0
});
const messages = [
    new SystemMessage("Translate the following to italian and dont include english response in output"),
    new HumanMessage("hi!My name is Sanjay and I love italy.Can u pls tell me a few places to visit in italy for a tourist"),
];
// const response = await model.invoke("hello?can u help me")
// console.log(response)
// const response = await model.invoke(messages)
// console.log(response)


// streaming messages

const stream = await model.stream(messages)

let chunks = []
for await(const chunk of stream)
{
    chunks.push(chunk);
    process.stdout.write(`${chunk.content}`);
}