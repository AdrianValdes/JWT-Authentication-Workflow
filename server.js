const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const PORT = 5000;

const JWT_SECRET = 'coolBeans2020';

app.use(express.json());
app.use(cookieParser());

let users = [
  { _id: 'haha123', username: 'Franz', password: 'dieVerwandlung1915' },
  { _id: 'hehe456', username: 'Thomas', password: 'derZauberberg1924' },
];

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const auth = (req, res, next) => {
  if (!req.cookies.token) {
    const error = new Error('Who are you?');
    error.status = 401;
    return next(error);
  }

  try {
    jwt.verify(req.cookies.token, JWT_SECRET);
    next();
  } catch (err) {
    next(err);
  }
};

app.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  const userExists = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!userExists) {
    const error = new Error('Login failed');
    error.status = 401;
    return next(error);
  }
  const token = jwt.sign({ _id: userExists._id }, JWT_SECRET);
  res.cookie('token', token, { maxAge: 1000 * 300, httpOnly: true });
  res.json(userExists);
});

app.get('/users', auth, (req, res) => {
  res.json(users);
});

app.use((err, req, res, next) => {
  res.json({ error: err.message });
});
