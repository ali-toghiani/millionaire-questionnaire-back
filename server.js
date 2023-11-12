const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/users', (req, res, next) => {
  const emailToCheck = req.body.email;

  const existingUser = router.db.get('users').find({ email: emailToCheck }).value();

  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  next();
});

server.get('/users', (req, res, next) => {
  const emailToCheck = req.query.email;
  const passToCheck = req.query.password;

  const existingUser = router.db.get('users').find({ email: emailToCheck, password: passToCheck }).value();

  if (existingUser) {
    return res.status(200).json({ ...existingUser });
  } else {
    return res.status(401).json({ error: "User not found"});
  }
  next();
});


server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});