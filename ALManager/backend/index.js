const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const postsRoutes = require('./routes/posts');

const productsRoutes = require('./routes/products');

const workstationsRoutes = require('./routes/workstations');

const assemblyLinesRoutes = require('./routes/assemblyLines');

const errorController = require('./controllers/error');

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use ((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);

app.use('/post', postsRoutes);

app.use('/products', productsRoutes);

app.use('/workstations', workstationsRoutes);

app.use('/assembly-lines', assemblyLinesRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));
