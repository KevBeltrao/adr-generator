import cors from 'cors';
import 'dotenv/config';
import { Request, Response, default as express } from 'express';
import requestOpenAI from './utils/requestOpenAI';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/openai', async (req: Request, res: Response) => {
  try {
    const response = await requestOpenAI(req.body.description);
  
    res.send({ markdown: response });
  } catch (error) {
    res.status(400).send({ error });
  }
});

app.use(express.json());

app.listen(3000);
