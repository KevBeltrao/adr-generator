declare const requestOpenAI: (description: string) => Promise<import("axios").AxiosResponse<import("openai").CreateCompletionResponse, any>>;
export default requestOpenAI;
