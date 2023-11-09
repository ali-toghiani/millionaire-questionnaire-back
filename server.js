const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/users', (req, res, next) => {
  const emailToCheck = req.body.email;

  // Check if an object with the same email already exists
  const existingUser = router.db.get('users').find({ email: emailToCheck }).value();

  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  // If email is unique, proceed to add the new user
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});