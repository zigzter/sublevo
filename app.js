const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const connectRedis = require('connect-redis');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride((req) => {
    if (typeof req.body === 'object' && req.body._method) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

const RedisStore = connectRedis(session);

app.use(session({
    secret: 'put super secret key here!',
    store: new RedisStore({ port: 6379, host: 'localhost' }),
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 680000000 },
}));

app.use(async (req, res, next) => {
    const { userId } = req.session;
    res.locals.currentUser = null;
    if (userId) {
        try {
            const user = await User.find(userId);
            req.currentUser = user;
            res.locals.currentUser = user;
            next();
        } catch (err) {
            next(err);
        }
    }
});

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.listen(3000);
