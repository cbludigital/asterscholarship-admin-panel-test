import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import bcrypt from 'bcrypt';
import { connectDB } from './config/connectDB.js';
import { Scholarship } from './models/scholarship.model.js';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.DASHBOARD_PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change_this_secret',
    resave: false,
    saveUninitialized: false,
  })
);

function isAuthenticated(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  }
  return res.redirect('/login');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

connectDB();

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (
    username === adminUser &&
    passwordHash &&
    (await bcrypt.compare(password, passwordHash))
  ) {
    req.session.authenticated = true;
    return res.redirect('/');
  }
  return res.status(401).render('login', { error: 'Invalid credentials' });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.get('/', isAuthenticated, async (req, res) => {
  try {
    const applications = await Scholarship.find().lean();
    res.render('index', { applications });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

if (process.env.SERVE_LOCAL) {
  app.listen(port, () => {
    console.log(`Admin dashboard running on port ${port}`);
  });
}

export const main = serverless(app, { provider: 'openwhisk' });
