const { createServer } = require('http');
// создайте REPL  с клиентом
// отправляющим тело запроса

createServer((req, res) => {
  const ip = res.socket.remoteAddress;
  console.log(req.url);
  console.log('ip', ip);
  let CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers':
      'x-test,Content-Type,Accept,Access-Control-Allow-Headers',
  };
  const result = {
    message: 'yuriiitymchenko',
    'x-result': req.headers['x-test'],
    'x-body': '',
  };
  if (req.url === '/result4/') {
    let body = '';

    req
      .on('data', (data) => {
        body += data;
        result['x-body'] = body;
        return result;
      })
      .on('end', () => {
        res.writeHead(200, {
          ...CORS,
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(result));
      });
  } else {
    res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });

    res.end(JSON.stringify(result));
  }
}).listen(3000, () => console.log('working on 3000'));
