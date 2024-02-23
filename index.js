const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const port = process.env.PORT || 4000

const corsOptions = {
    origin: 'https://motion-agency.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
require('dotenv').config()
require('./database/db')
require('./commun/initScript')
require('./middlewares/Bearer')
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://motion-agency.vercel.app');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.options('*', cors(corsOptions));

app.use(morgan('dev'))
app.use(express.urlencoded({ limit: '100mb', extended: true }))
app.use(express.json({ limit: '100mb' }))
app.use(bodyParser.json({ limit: 100 * 1024 * 1024 }))
app.use(bodyParser.urlencoded({ limit: 100 * 1024 * 1024, extended: true, parameterLimit: 50000 }))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(session({ resave: true, secret: process.env.JWT_SECRET, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//routes
const authRouter = require('./routes/authApi');
const workRouter = require('./routes/workApi');
const userApi = require('./routes/userApi');

app.use('/app/v1', authRouter);
app.use('/app/v1', workRouter);
app.use('/app/v1', userApi);


app.listen(port, () => { console.log('App running on port ' + port) })