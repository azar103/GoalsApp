const express = require('express');
const connectDB = require('./config/connectDB');
const { errorHandler } = require('./config/errorMiddleware');

const app = express();
const goalRouter = require('./routers/goal');
const userRouter = require('./routers/user');



connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use('/api/goals', goalRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);
const port = process.env.DEFAULT_PORT || 5000

app.listen(port, () => {
    console.log(`the server is running on port ${port}...`);
})