if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectRedis = require('connect-redis');
const path = require('path');
const helmet = require('helmet');
const User = require('./models/user');

const { SESSION_KEY } = process.env;

const app = express();

// API CONFIG =======================================================

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'Lots of caffeine' }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// SESSION CONFIG ===================================================

const RedisStore = connectRedis(session);

const localRedis = { port: 6379, host: 'localhost' };
const deployedRedis = { url: process.env.REDIS_URL };

app.use(session({
    secret: SESSION_KEY,
    name: 'sessionId',
    store: new RedisStore((process.env.NODE_ENV === 'production') ? deployedRedis : localRedis),
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

app.use('/api', indexRouter);

app.get('/*', (req, res) => {
    const url = path.join(__dirname, './client/build', 'index.html');
    res.sendFile(url);
});

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log('ERROR MESSAGE', err.message);
        console.log('ERROR STACK', err.stack);
        return res.status(500).json({ error: err.message });
    }
    next(err);
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Server listening on port ${ PORT }`);
});
