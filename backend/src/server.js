const express = require('express');
const app = express();
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/auth');



//mongoose connection

mongoose.connect(
    'mongodb+srv://root:admin@ecommerceapp.x3zqx.mongodb.net/ecommerceapp?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }).then(() => {
    console.log('database is connected');
});


app.use(bodyParser());

app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server is running onport ${port}`);
});