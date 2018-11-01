require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const connectRedis = require('connect-redis');
const SpotifyWebApi = require('spotify-web-api-node');
const flash = require('connect-flash');
const User = require('./models/user');

const SpotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const SpotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const spotify = new SpotifyWebApi({
    clientId: SpotifyClientId,
    clientSecret: SpotifyClientSecret,
});

const app = express();

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

const RedisStore = connectRedis(session);

app.use(session({
    secret: 'put super secret key here!',
    store: new RedisStore({ port: 6379, host: 'localhost' }),
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 680000000 },
}));

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

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.use('/api', (req, res, next) => {
    spotify.clientCredentialsGrant().then(
        (data) => {
            spotify.setAccessToken(data.body['access_token']);
            next();
        },
        (err) => {
            next(err);
        },
    );
});

app.post('/api', (req, res, next) => {
    try {
        const { artist } = req.body;
        spotify.searchArtists(artist, { limit: 5 })
            .then((data) => {
                const { items } = data.body.artists;
                res.json(items);
            }, (err) => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
});

app.listen(3000, () => {
    console.log('server up');
});
