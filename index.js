const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4000
require('dotenv').config()
require('./database/db')
// require('./commun/initScript')
require('./middlewares/Bearer')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.json())

//routes
const authRouter = require('./routes/authApi');
const userApi = require('./routes/userApi');

app.use('/app/v1', authRouter);
app.use('/app/v1', userApi);


app.listen(port, () => { console.log('App running on port ' + port) })