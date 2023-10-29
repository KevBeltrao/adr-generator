import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const requestOpenAI = async (description: string): Promise<string> => {
  const promptIntro = `You are a staff engineer responsible for creating Architecture Decision Records.
  
  You will be provided a description of an architecture decision and you will need to create an ADR.

  As a staff engineer, it's also expected you will provide new insights that are not mentioned on the input, such as consequences, alternatives, and rationale.
  
  Description:\n\n`;

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{
      role: 'user', content: `${promptIntro} ${description}`,
    }],
  });
  return response.data.choices[0].message?.content ?? '';
};

export default requestOpenAI;
