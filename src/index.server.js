const express = require('express')
const app = express()
const env = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')

// routes
const userRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
// environment variable
env.config()
const port = process.env.PORT

// mongodb connection
// mongodb+srv://raj:<password>@cluster0.okw1r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.okw1r.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database Connected');
});

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.listen(port, () => console.log(`Server Running on port ${port}!`))