import cors from 'cors';
import 'dotenv/config';
import { Request, Response, default as express } from 'express';
import requestOpenAI from './utils/requestOpenAI';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/openai', async (req: Request, res: Response) => {
  const response = await requestOpenAI(req.body.description);

  const { text } = response.data.choices[0];
  res.send({ markdown: text });
});

app.use(express.json());

app.listen(3000);
