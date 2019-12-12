import * as express from 'express';
import { EVENT } from '../types'

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));

const SSE_RESPONSE_HEADER = {
  'Connection': 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no'
};

interface IResponseUserInfo {
  name: string
  blog: string
  createdTime: number
}

const createStreamResponse = <T>(event: EVENT, data: T) => {
  return `data: ${JSON.stringify(data)}\n\nevent: ${event}\n`;
}

app.get('/stream', (req, res, next) => {
  res.writeHead(200, SSE_RESPONSE_HEADER)
  res.write('\n');

  const id = setInterval(() => {
    res.write(createStreamResponse<IResponseUserInfo>(EVENT.USER_INFO, {
      name: 'jbee',
      blog: 'jbee.io',
      createdTime: Date.now()
    }))
  }, 5000)

  req.on('close', () => {
    console.log(`Close stream`)
    clearInterval(id)
  })
  req.on('end', () => {
    console.log(`End stream`)
  })
})

app.listen(port, () => console.log(`Server listening on port: ${port}`));
