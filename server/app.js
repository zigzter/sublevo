require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const connectRedis = require('connect-redis');
const flash = require('connect-flash');
const User = require('./models/user');

const app = express();

// APIPCONFIG =======================================================

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride((req) => {
    if (typeof req.body === 'object' && req.body._method) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

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

app.use(flash());

app.use((req, res, next) => {
    res.locals.flash = req.session.flash;
    next();
});

const errorDisplayHelper = require('./helpers/errors');

app.locals.errors = [];
Object.assign(app.locals, errorDisplayHelper);

app.use(async (req, res, next) => {
    try {
        const { userId } = req.session;
        res.locals.currentUser = null;
        if (userId) {
            const user = await User.findById(userId);
            req.currentUser = user;
            res.locals.currentUser = user;
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
