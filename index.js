const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const port = process.env.PORT || 4000
require('dotenv').config()
require('./database/db')
require('./commun/initScript')
require('./middlewares/Bearer')

app.use(cors());
app.use(morgan('dev'))
app.use(express.urlencoded({ limit: '100mb', extended: false }))
app.use(express.json({ limit: '100mb' }))
app.use(bodyParser.json({ limit: 50 * 1024 * 1024 }))
app.use(bodyParser.urlencoded({ limit: 50 * 1024 * 1024, extended: true, parameterLimit: 50000 }))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(session({ resave: true, secret: process.env.JWT_SECRET, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//routes
const authRouter = require('./routes/authApi');
const userApi = require('./routes/userApi');

app.use('/app/v1', authRouter);
app.use('/app/v1', userApi);


app.listen(port, () => { console.log('App running on port ' + port) })