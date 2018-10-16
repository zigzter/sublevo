const app = require('express')();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hello from app.js');
});

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.listen(3000);
