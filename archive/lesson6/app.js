export default (
  express,
  bodyParser,
  fs,
  CORS,
  User,
  UserController,
  mongoose,
  cookieParser,
  session,
  mstore
) => {
  const users = new Set();
  const app = express();
  const db = mongoose.connection;
  // connector
  const MongoStore = mstore(session);
  const protect = (r, res, next) => {
    // const { user } = r.cookies;
    if (r.session.name === 'admin') return next();
    res.redirect('/denied');
  };

  app
    .use(bodyParser.json({ type: 'application/*+json' }))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(
      session({
        secret: 'mysecret',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: db }),
      })
    )
    .use(cookieParser())
    .use((r, res, next) => r.res.set(CORS) && next())
    .use('/user', UserController(express, User))
    .get('/login/', (req, res) => res.send('eliasgoss'))
    .get('/denied', (r) => r.res.status(403).send('User is not allowed'))
    .get('/profile', protect, (r) => {
      // const { user } = r.cookies;
      const { name } = r.session;
      r.res.send(`User found ${name}`);
    })
    .get('/code/', (req, res) =>
      fs.createReadStream(import.meta.url.substring(7)).pipe(res)
    )
    .get('/prune', (r) => {
      delete r.session.name;
      // const cookieHead = {
      //   'Set-Cookie': `user=.;path=/;expirest=Thu, 01 Jan 1970 00:00:01 GMT`,
      // };
      r.res.send('Cleaned!');
    })
    .get('/set/:user', (r) => {
      const { user } = r.params;
      r.session = r.session || {};
      r.session.name = user;
      // const cookieHead = { 'Set-Cookie': `user = ${user};path=/;max-age=60` };
      // users.add(user);
      r.res.send(`Set up ${user}`);
    })
    .get('/*', (r) => r.res.send('Работает!'));

  return app;
};
