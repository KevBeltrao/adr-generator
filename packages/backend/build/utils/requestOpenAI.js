"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: process.env.VITE_OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
const requestOpenAI = (description) => __awaiter(void 0, void 0, void 0, function* () {
    const promptIntro = 'Just respond using markdown syntax. Create an architecture decision record with the following description:\n';
    const response = yield openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${promptIntro} ${description}`,
        temperature: 0,
        max_tokens: 2048,
    });
    return response;
});
exports.default = requestOpenAI;
