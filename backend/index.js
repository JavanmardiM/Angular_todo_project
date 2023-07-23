const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const users = require('./users.json');
const JWT_SECRET = 'secret_razalod';

const delay = (req, res, next) => {
  const delayMs = Math.random() * 1000 + 50;
  console.log(delayMs);
  setTimeout(() => {
    res.setHeader('DELAY', delayMs);
    next();
  }, delayMs);
};

const authorize = (req, res, next) => {
  let token = req.headers['token'];
  try {
    var decoded = jwt.verify(token, JWT_SECRET);
    res.setHeader('X-USER', decoded.email);
    next();
  } catch (err) {
    return res.status(401).send(err);
  }
};

server.use(jsonServer.bodyParser);
server.use(middlewares);
//server.use(delay);

server.post('/users', register());
server.post('/users/login', login());

// server.use(authorize);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port', 3000);
});

function login() {
  return (req, res) => {
    let user = { email: req.body.email, password: req.body.password };
    let registeredUser = users.find(x => x.email === user.email);
    if (!registeredUser) {
      res.send(404, { error: 'user not found' });
      return;
    }
    if (registeredUser.password !== user.password) {
      res.send(401, { error: 'wrong password' });
      return;
    }
    const token = jwt.sign({ email: registeredUser.email }, JWT_SECRET, { expiresIn: '30d' });
    res.send({ token });
  };
}

function register() {
  return (req, res) => {
    let user = { email: req.body.email, password: req.body.password };
    if (users.find(x => x.email === user.email)) {
      res.send(403, { error: 'user exist' });
      return;
    }
    users.push(user);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    res.send({ token });
  };
}
