export default (
  express,
  bodyParser,
  createReadStream,
  crypto,
  http,
  mongoose,
  User,
  CORS
) => {
  const app = express();

  app
    .use((req, res, next) => {
      res.set(CORS);
      next();
    })
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/sha1/:input', (req, res) => {
      const { input } = req.params;
      const shasum = crypto.createHash('sha1');
      shasum.update(input);
      res.send(shasum.digest('hex'));
    })
    .get('/login/', (req, res) => res.send('yuriiitymchenko'))
    .get('/code/', (req, res) => {
      res.set({ 'Content-Type': 'text/plain; charset=utf-8' });
      createReadStream(import.meta.url.substring(7)).pipe(res);
    });

  app.post('/insert/', async (req, res) => {
    const { URL, login, password } = req.body;
    try {
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      res.send(e.codeName);
    }

    const newUser = new User({ login, password });
    await newUser.save();
    res.status(201).send(`User was saved with login ${login}`);
  });

  app.all('/req/', (req, res) => {
    let url = req.method === 'POST' ? req.body.addr : req.query.addr;
    http.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => (data += chunk));
      response.on('end', () => {
        res
          .set({
            'Content-Type': 'text/plain; charset=utf-8',
          })
          .end(data);
      });
    });
  });

  app
    .all('*', (req, res) => {
      res.send('yuriiitymchenko');
    })
    .use((error, req, res, next) =>
      res.status(500).set(CORS).send(`Error : ${error}`)
    );

  return app;
};
