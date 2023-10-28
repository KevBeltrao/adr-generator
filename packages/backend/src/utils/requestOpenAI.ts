import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const requestOpenAI = async (description: string) => {
  const promptIntro = 'Just respond using markdown syntax. Create an architecture decision record with the following description:\n';

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${promptIntro} ${description}`,
    temperature: 0,
    max_tokens: 2048,
  });
  
  return response;
};

export default requestOpenAI;
