require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectRedis = require('connect-redis');
const User = require('./models/user');

const app = express();

// APIPCONFIG =======================================================

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SESSION CONFIG ===================================================

const RedisStore = connectRedis(session);

app.use(session({
    secret: 'put super secret key here!',
    name: 'sessionId',
    store: new RedisStore({ port: 6379, host: 'localhost' }),
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 680000000 },
}));

// UTILITY ==========================================================

app.use(async (req, res, next) => {
    try {
        const { userId } = req.session;
        if (userId) {
            const user = await User.findById(userId);
            req.currentUser = user;
        }
        next();
    } catch (err) {
        next(err);
    }
});

// ROUTING ==========================================================

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.listen(3030, () => {
    console.log('server up');
});
