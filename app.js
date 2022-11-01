const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const paginate = require('handlebars-paginate');
const adminRouter = require('./routes/admin');

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  paginate,
});

// Config
// Handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session
app.use(session({
  secret: 'password',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());

// Middlewere
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Routes
app.use('/admin/createacont', (req, res) => res.render('createacont'));
app.use('/admin/singin', (req, res) => res.render('singIn'));
app.use('/admin', adminRouter);
app.get('/admin', (req, res) => res.render('home'));

app.listen(8082, () => console.log('Server conected.'));
